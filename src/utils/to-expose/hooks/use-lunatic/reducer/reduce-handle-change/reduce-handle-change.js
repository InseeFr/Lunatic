import reduceVariablesArray from './reduce-variables-array';
import reduceVariablesSimple from './reduce-variables-simple';

function isOnSubPage(pager) {
	const { subPage } = pager;
	return subPage !== undefined;
}

function updateVariables(state, action) {
	const { payload } = action;
	const { response, value, args = {} } = payload;
	const { name } = response;
	const { loop, index, length } = args;

	const { pager, variables } = state;
	const { nbIterations, iteration } = pager;

	if (loop) {
		const variablesNext = reduceVariablesArray(variables, {
			name,
			value,
			index,
			length,
		});
		return { ...state, variables: variablesNext };
	} else if (isOnSubPage(pager)) {
		const variablesNext = reduceVariablesArray(variables, {
			name,
			value,
			index: iteration,
			length: nbIterations,
		});

		return { ...state, variables: variablesNext };
	} else {
		const variablesNext = reduceVariablesSimple(variables, { name, value });
		return { ...state, variables: variablesNext };
	}
}

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	return updateVariables(state, action);
}

export default reduceHandleChange;
