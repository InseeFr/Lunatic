import { isOnSubPage } from '../commons';

// side effect!
function fillResponse(response, value) {
	const { values } = response;
	values.PREVIOUS = response.COLLECTED;
	values.COLLECTED = value;
}

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	const { payload } = action;
	const { todo, component } = payload;
	const { response } = component;
	const { pager, bindings } = state;
	const { nbIterations, iteration } = pager;

	// With side effect!
	if (isOnSubPage(pager)) {
		Object.entries(todo).forEach(function ([name, value]) {
			if (name in bindings) {
				const target = bindings[name];
				if (!Array.isArray(target) || target.length !== nbIterations) {
					bindings[name] = new Array(nbIterations);
				}
				bindings[name][iteration] = value;
				// TODO fill response
			}
		});
	} else {
		Object.entries(todo).forEach(function ([name, value]) {
			if (name in bindings) {
				bindings[name] = value;
				if (name === response.name) {
					fillResponse(response, value);
				}
			}
		});
	}

	return state;
}

export default reduceHandleChange;
