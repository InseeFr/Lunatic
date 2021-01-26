import * as C from '../../constants';
import { buildFilledComponent } from './init-questionnaire';
import { supportedPreferences } from '../../constants/supported-preferences';
import { interpret } from './interpret';
import { buildVectorialBindings } from '../lib/loops/bindings';

export const updateQuestionnaire = (valueType) => (questionnaire) => (
	preferences
) => (updatedValues) => {
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
		valueType === C.COLLECTED ? addCalculatedVars(newVariables) : newVariables;
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

export const buildNewValue = (preferences) => (valueType) => (oldValues) => (
	value
) => {
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

const addCalculatedVars = (variables) => {
	if (
		!variables[C.CALCULATED] ||
		Object.keys(variables[C.CALCULATED]).length === 0
	)
		return variables;
	const { COLLECTED, EXTERNAL, CALCULATED } = variables;
	const collected = Object.entries(COLLECTED).reduce(
		(acc, [key, { values }]) => ({ ...acc, [key]: values[C.COLLECTED] }),
		{}
	);
	const bindings = buildVectorialBindings({ ...collected, ...EXTERNAL });
	const calculated = Object.entries(CALCULATED).reduce(
		(acc, [key, { expression }]) => {
			// Assume that a calculated variable has a first level scope
			// If we need to handle deep calculated variables, we have to
			// update the shape of bindings, grouping vars by type
			const res = interpret(['VTL'])(bindings)(expression);
			const value = Array.isArray(res) ? res.join(',') : res;
			return {
				...acc,
				[key]: { expression, value },
			};
		},
		{}
	);
	return { EXTERNAL, COLLECTED, CALCULATED: calculated };
};
