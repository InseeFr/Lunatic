import { executeVtlExpression } from '../commons/execute-expression/execute-expression';
import getVtlCompatibleValue from '../../utils/vtl';
import { CALCULATED } from '../../constants';

export const interpretAllCalculatedVariables = ({
	variables,
	partialVariables,
	builtVariables,
}) => {
	console.log('interpretAllCalculatedVariables', {
		variables,
		partialVariables,
		builtVariables,
	});
	return Object.entries(partialVariables || variables).reduce((acc, [k, v]) => {
		if (k in acc) return acc;
		const { type } = v;
		if (type === CALCULATED) {
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
			if (shapeFrom) {
				const result = acc[shapeFrom].map((_, index) => {
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

const buildBindings = ({ builtVariables, bindingDependencies, variables }) =>
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

const buildScopedBindings = ({ bindings, index }) =>
	Object.entries(bindings).reduce((acc, [k, v]) => {
		if (Array.isArray(v))
			return { ...acc, [k]: v[index] !== undefined ? v[index] : null };
		return { ...acc, [k]: v };
	}, {});

const buildVectorialBindings = ({ bindings }) =>
	Object.entries(bindings).reduce((acc, [k, v]) => {
		if (Array.isArray(v)) return { ...acc, [k]: getVtlCompatibleValue(v) };
		return { ...acc, [k]: v };
	}, {});
