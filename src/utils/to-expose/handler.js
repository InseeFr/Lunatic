import * as C from '../../constants';
import { buildFilledComponent } from './init-questionnaire';
import { supportedPreferences } from '../../constants/supported-preferences';
import { getCalculatedVariables } from './calculated-variables';
import { isDev } from '../lib';

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
		const newVariablesWithCalculated = addCalculatedVars(
			newVariables,
			updatedValues
		)(logFunction, preferences);
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

export const updateExternals =
	(questionnaire) => (logFunction, preferences) => (updatedValues) => {
		const { variables, ...other } = questionnaire;
		const { EXTERNAL } = variables;
		const newVariables = {
			...variables,
			EXTERNAL: { ...EXTERNAL, ...updatedValues },
		};

		const newVariablesWithCalculated = addCalculatedVars(
			newVariables,
			updatedValues
		)(logFunction, preferences);
		return {
			...other,
			variables: newVariablesWithCalculated,
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

// Separate methods to avoid perf issue on collect simplest use case
const getCollectedAndExternal = (preferences) => (variables) => {
	const { COLLECTED, EXTERNAL } = variables;
	if (preferences.length === 1 && preferences[0] === 'COLLECTED')
		return { ...getCollectedAndExternalSimple(COLLECTED), ...EXTERNAL };
	return {
		...getCollectedAndExternalByPreferences(preferences)(COLLECTED),
		...EXTERNAL,
	};
};

const getCollectedAndExternalSimple = (variables) =>
	Object.entries(variables).reduce(
		(acc, [k, { values }]) => ({ ...acc, [k]: values.COLLECTED }),
		{}
	);

const getCollectedAndExternalByPreferences = (preferences) => (variables) =>
	Object.entries(variables).reduce((acc, [k, { values }]) => {
		const v = preferences.reduce((acc, p) => {
			const value = values[p];
			return [null, ''].includes(value) ? acc : value;
		}, null);
		return { ...acc, [k]: v };
	}, {});

const addCalculatedVars =
	(variables, updatedValues) => (logFunction, preferences) => {
		if (
			!variables[C.CALCULATED] ||
			Object.keys(variables[C.CALCULATED]).length === 0
		)
			return variables;

		if (isDev) {
			console.log('Start var calculation');
			var start = new Date().getTime();
		}

		const { COLLECTED, EXTERNAL, CALCULATED: calculatedVariables } = variables;

		const updatedVars = Object.keys(updatedValues);

		const bindings = getCollectedAndExternal(preferences)(variables);

		const CALCULATED = getCalculatedVariables(calculatedVariables)({
			bindings,
			updatedVars,
			logFunction,
		});

		if (isDev)
			console.log(`End var calculation: ${new Date().getTime() - start} ms`);

		return { EXTERNAL, COLLECTED, CALCULATED };
	};
