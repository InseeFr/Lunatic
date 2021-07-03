import * as C from '../../constants';
import { buildFilledComponent } from './init-questionnaire';
import { supportedPreferences } from '../../constants/supported-preferences';
import { getCalculatedVariables } from './init-questionnaire';
import { isDev, isFunction } from '../lib';
import {
	CALCULATED_VAR_CATEGORY,
	EVENT_VALUE_CHANGE,
} from '../../constants/event-types';

export const updateQuestionnaire =
	(valueType) =>
	(questionnaire) =>
	(preferences, logFunction) =>
	(updatedValues) => {
		if (
			!supportedPreferences.includes(valueType) ||
			preferences.length === 0 ||
			!updatedValues
		)
			return questionnaire;
		const { variables, components, ...other } = questionnaire;
		if (!components || components.length === 0) return questionnaire;
		const varsAndRefs = Object.entries(updatedValues).reduce(
			(acc, [key, value]) => {
				const {
					newVariables: { COLLECTED, ...otherVars },
					refs,
				} = acc;
				const { componentRef, values } = COLLECTED[key];
				const updated = {
					componentRef,
					values: {
						...values,
						[valueType]: buildNewValue(preferences)(valueType)(values)(value),
					},
				};
				const newCollected = { ...COLLECTED, [key]: updated };
				return {
					newVariables: {
						...otherVars,
						COLLECTED: newCollected,
					},
					refs: [...refs, componentRef],
				};
			},
			{ newVariables: variables, refs: [] }
		);
		const { newVariables, refs: r } = varsAndRefs;
		const newVariablesWithCalculated =
			valueType === C.COLLECTED
				? addCalculatedVars(newVariables, updatedValues)(logFunction)
				: newVariables;
		const collectedVars = newVariables[C.COLLECTED];
		const newComponents = components.map((c) => {
			if (r.includes(c.id)) return buildFilledComponent(collectedVars)(c);
			return c;
		});
		return {
			...other,
			variables: newVariablesWithCalculated,
			components: newComponents,
		};
	};

export const buildNewValue =
	(preferences) => (valueType) => (oldValues) => (value) => {
		if (preferences.length === 1) return value;
		const index = preferences.indexOf(valueType);
		if (index < 1) return value;
		const valuesByPreference = preferences
			.slice(0, index)
			.map((p) => oldValues[p])
			.filter((v) => v !== null);
		const lastValue = valuesByPreference[valuesByPreference.length - 1];
		return lastValue === value ? null : value;
	};

const getCollectedAndExternal = (variables) => {
	const { COLLECTED } = variables;
	const collected = Object.entries(COLLECTED).reduce(
		(acc, [k, { values }]) => ({ ...acc, [k]: values.COLLECTED }),
		{}
	);
	return { ...collected, ...variables.EXTERNAL };
};

const addCalculatedVars = (variables, updatedValues) => (logFunction) => {
	if (
		!variables[C.CALCULATED] ||
		Object.keys(variables[C.CALCULATED]).length === 0
	)
		return variables;

	if (isDev) {
		console.log('Start var calculation');
		var start = new Date().getTime();
	}

	const { COLLECTED, EXTERNAL, CALCULATED } = variables;

	const updatedVars = Object.keys(updatedValues);

	const bindings = getCollectedAndExternal(variables);

	const calculated = Object.entries(CALCULATED).reduce((acc, [key, v]) => {
		const { bindingDependencies, value } = v;
		if (
			Array.isArray(bindingDependencies) &&
			!updatedVars.some((ai) => bindingDependencies.includes(ai))
		) {
			return { ...acc, [key]: v };
		}
		const calculatedVariables = getCalculatedVariables({ name: key, ...v })(
			bindings
		);
		if (
			isFunction(logFunction) &&
			// Filter only filterResult vars : key.startsWith('FILTER_RESULT_') &&
			JSON.stringify(value) !== JSON.stringify(calculatedVariables[key].value)
		) {
			logFunction({
				idParadataObject: `${key}`,
				typeParadataObject: CALCULATED_VAR_CATEGORY,
				type: EVENT_VALUE_CHANGE,
				oldValue: value,
				newValue: calculatedVariables[key]?.value,
			});
		}
		return { ...acc, ...calculatedVariables };
	}, {});

	if (isDev)
		console.log(`End var calculation: ${new Date().getTime() - start} ms`);

	return { EXTERNAL, COLLECTED, CALCULATED: calculated };
};
