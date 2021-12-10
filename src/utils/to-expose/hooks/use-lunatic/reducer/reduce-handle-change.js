import { isOnSubPage } from '../commons';

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
		// TODO: handle sub-page
	} else {
		const { name } = response;
		if (name in variables) {
			return {
				...state,
				variables: { ...variables, [name]: { ...variables[name], value } }, // on pourrait ici se contenter d'un effet de bord
			};
		}
	}

	return state;
}

export default reduceHandleChange;
