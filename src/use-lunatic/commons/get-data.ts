import { COLLECTED, CALCULATED, EXTERNAL } from '../../constants';
import { interpretAllCalculatedVariables } from './calculated-variables';

export const getQuestionnaireData = ({
	variables,
	withRefreshedCalculated,
}) => {
	const builtVariables = Object.entries(variables).reduce(
		(acc, [k, { value, type }]) => {
			// TODO: refine for management
			if (type === COLLECTED)
				return {
					...acc,
					COLLECTED: {
						...acc.COLLECTED,
						[k]: {
							EDITED: null,
							FORCED: null,
							INPUTED: null,
							PREVIOUS: null,
							COLLECTED: value,
						},
					},
				};
			if (
				type === EXTERNAL ||
				(type === CALCULATED && !withRefreshedCalculated)
			)
				return { ...acc, [type]: { ...acc[type], [k]: value } };
			return acc;
		},
		{ EXTERNAL: {}, CALCULATED: {}, COLLECTED: {} }
	);
	if (!withRefreshedCalculated) return builtVariables;
	const flattenBuiltVariables = Object.entries(builtVariables).reduce(
		(acc, [type, v]) => {
			if (type === COLLECTED) {
				const collectedVariables = Object.entries(v).reduce(
					(accCol, [k, { COLLECTED: c }]) => ({ ...accCol, [k]: c }),
					{}
				);
				return { ...acc, ...collectedVariables };
			}
			return { ...acc, ...v };
		},
		{}
	);
	const flattenCalculatedVariables = interpretAllCalculatedVariables({
		variables,
		builtVariables: flattenBuiltVariables,
	});
	const calculatedVariables = Object.entries(flattenCalculatedVariables).reduce(
		(acc, [k, v]) => ({ ...acc, [k]: v }),
		{}
	);
	return { ...builtVariables, [CALCULATED]: calculatedVariables };
};
