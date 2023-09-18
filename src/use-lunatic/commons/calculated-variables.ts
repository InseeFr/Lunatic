import { executeVtlExpression } from './execute-expression/execute-expression';
import getVtlCompatibleValue from '../../utils/vtl';
import { CALCULATED } from '../../constants';
import type { LunaticState, LunaticValues } from '../type';

export const interpretAllCalculatedVariables = ({
	variables,
	partialVariables,
	builtVariables,
}: {
	variables: LunaticState['variables'];
	builtVariables: LunaticValues;
	partialVariables?: LunaticState['variables'];
}) => {
	return Object.entries(partialVariables ?? variables).reduce((acc, [k, v]) => {
		if (k in acc) return acc;
		if (v.type === CALCULATED) {
			const {
				variable: {
					expression: { value: expression },
					shapeFrom,
					bindingDependencies = [],
				},
			} = v;
			const bindings = buildBindings({
				builtVariables: acc,
				bindingDependencies,
				variables,
			});
			const shapeTarget = shapeFrom ? acc[shapeFrom] : null;
			if (shapeFrom && Array.isArray(shapeTarget)) {
				const result = shapeTarget.map((_, index) => {
					const scopedBindings = buildScopedBindings({ bindings, index });
					return executeVtlExpression(expression, scopedBindings);
				});
				return { ...acc, ...bindings, [k]: result };
			}
			const vectorialBindings = buildVectorialBindings({ bindings });
			return {
				...acc,
				...bindings,
				[k]: executeVtlExpression(expression, vectorialBindings),
			};
		}
		return acc;
	}, builtVariables);
};

/**
 * Build a map of values for each variables
 */
const buildBindings = ({
	builtVariables,
	bindingDependencies,
	variables,
}: {
	variables: LunaticState['variables'];
	builtVariables: LunaticValues;
	bindingDependencies: string[];
}): LunaticValues =>
	bindingDependencies.reduce((acc, b) => {
		if (builtVariables[b] === undefined) {
			const unresolvedVariable = { [b]: variables[b] };
			const result = interpretAllCalculatedVariables({
				partialVariables: unresolvedVariable,
				variables,
				builtVariables,
			})[b];
			return { ...acc, [b]: result };
		}
		return { ...acc, [b]: builtVariables[b] };
	}, {});

const buildScopedBindings = ({
	bindings,
	index,
}: {
	bindings: LunaticValues;
	index: number;
}) =>
	Object.entries(bindings).reduce((acc, [k, v]) => {
		if (Array.isArray(v))
			return { ...acc, [k]: v[index] !== undefined ? v[index] : null };
		return { ...acc, [k]: v };
	}, {});

const buildVectorialBindings = ({ bindings }: { bindings: LunaticValues }) =>
	Object.entries(bindings).reduce((acc, [k, v]) => {
		if (Array.isArray(v)) return { ...acc, [k]: getVtlCompatibleValue(v) };
		return { ...acc, [k]: v };
	}, {});
