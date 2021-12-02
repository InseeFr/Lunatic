import { isOnSubPage } from '../commons';

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	const { payload } = action;
	const { todo } = payload;

	const { pager, bindings } = state;
	const { nbIterations } = pager;

	// With side effect!
	if (isOnSubPage(pager)) {
		Object.entries(todo).forEach(function ([name, value]) {
			if (name in bindings) {
				const target = bindings[name];
				if (!Array.isArray(target) || target.length !== nbIterations) {
					bindings[name] = new Array(nbIterations);
				}
				bindings[name][iteration] = value;
			}
		});
	} else {
		Object.entries(todo).forEach(function ([name, value]) {
			if (name in bindings) {
				bindings[name] = value;
			}
		});
	}

	return state;
}

export default reduceHandleChange;
