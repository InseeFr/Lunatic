import { isOnSubPage } from '../commons';

// side effect!

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	const { payload } = action;
	const { response, value } = payload;
	const { pager, variables } = state;
	const { nbIterations, iteration } = pager;

	if (isOnSubPage(pager)) {
	} else {
		const { name } = response;
		if (name in variables) {
			variables[name].value = value;
		}
	}

	return { ...state };
}

export default reduceHandleChange;
