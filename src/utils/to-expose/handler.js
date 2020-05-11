import * as C from '../../constants';
import {
	buildResponseComponent,
	buildResponsesComponent,
	buildCellsComponent,
} from './init-questionnaire';
import { supportedPreferences } from '../../constants';

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
			// TODO Update CALCULATED vars with VTL
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
			return {
				newVariables: {
					...otherVars,
					COLLECTED: { ...COLLECTED, [key]: updated },
				},
				refs: [...refs, componentRef],
			};
		},
		{ newVariables: variables, refs: [] }
	);
	const { newVariables, refs } = varsAndRefs;
	const collectedVars = newVariables[C.COLLECTED];
	const newComponents = components.map((c) => {
		if (refs.includes(c.id)) {
			if (c.response) return buildResponseComponent(collectedVars)(c);
			else if (c.responses) return buildResponsesComponent(collectedVars)(c);
			else if (c.cells) return buildCellsComponent(collectedVars)(c);
			return c;
		}
		return c;
	});
	return { ...other, variables: newVariables, components: newComponents };
};

const buildNewValue = (preferences) => (valueType) => (oldValues) => (
	value
) => {
	if (preferences.length === 1) return value;
	const index = preferences.indexOf(valueType);
	if (index < 1) return value;
	const before = preferences[index - 1];
	return oldValues[before] === value ? null : value;
};
