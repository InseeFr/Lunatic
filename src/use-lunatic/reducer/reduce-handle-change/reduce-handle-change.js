import reduceVariablesArray from './reduce-variables-array';
import reduceVariablesSimple from './reduce-variables-simple';
import reduceCleaning from './reduce-cleaning';
import reduceMissing from './reduce-missing';
import reduceResizing from './reduce-resizing';

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
 * met à jour bindings pour l'exe du VTL (en appelant la fonction fournit par createExecuteExpression)
 * @param {*} state
 * @param {*} action
 * @returns
 */
function updateBindings(state, action) {
	const { payload } = action;
	const { response } = payload;
	const { name } = response;
	const { updateBindings, variables } = state;
	const { value } = variables[name];

	updateBindings(name, value);

	return state;
}

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	return reduceResizing(
		reduceMissing(
			reduceCleaning(
				updateBindings(updateVariables(state, action), action),
				action
			),
			action
		),
		action
	);
}

export default reduceHandleChange;
