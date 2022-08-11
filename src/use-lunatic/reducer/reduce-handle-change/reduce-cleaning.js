import { getCompatibleVTLExpression } from '../../commons';

function reduceCleaning(state, action) {
	const { payload } = action;
	const { response } = payload;
	const { executeExpression, cleaning, updateBindings, variables, pager } =
		state;
	const { iteration } = pager;
	if (response) {
		const { name } = response;
		if (name in cleaning) {
			const expressions = cleaning[name];
			const delta = Object.entries(expressions).reduce(function (
				step,
				[key, expression]
			) {
				const isCleaning = executeExpression(
					getCompatibleVTLExpression(expression),
					{ iteration }
				);
				if (!isCleaning && key in variables) {
					const variableRoot = variables[key];
					const { variable } = variableRoot;
					const initialValue = variable?.values?.COLLECTED || null;
					updateBindings(key, initialValue);
					return { ...step, [key]: { ...variableRoot, value: initialValue } };
				}
				return step;
			},
			{});
			//TODO lastReachedPage cleaning
			return {
				...state,
				variables: {
					...variables,
					...delta,
				},
			};
		}
	}
	return state;
}

export default reduceCleaning;
