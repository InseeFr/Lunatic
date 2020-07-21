import * as C from '../../constants';
import {
	buildResponseComponent,
	buildResponsesComponent,
	buildCellsComponent,
	buildComponentsComponent,
} from './init-questionnaire';
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
	const { newVariables, refs } = varsAndRefs;
	const newVariablesWithCalculated =
		valueType === C.COLLECTED ? addCalculatedVars(newVariables) : newVariables;
	const collectedVars = newVariables[C.COLLECTED];
	const newComponents = components.map((c) => {
		if (refs.includes(c.id)) {
			if (c.response) return buildResponseComponent(collectedVars)(c);
			else if (c.responses) return buildResponsesComponent(collectedVars)(c);
			else if (c.cells) return buildCellsComponent(collectedVars)(c);
			else if (c.components) return buildComponentsComponent(collectedVars)(c);
			return c;
		}
		return c;
	});
	return {
		...other,
		variables: newVariablesWithCalculated,
		components: newComponents,
	};
};

const buildNewValue = (preferences) => (valueType) => (oldValues) => (
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
		(acc, [key, { expression }]) => ({
			...acc,
			[key]: { expression, value: interpret(['VTL'])(bindings)(expression) },
		}),
		{}
	);
	return { EXTERNAL, COLLECTED, CALCULATED: calculated };
};
