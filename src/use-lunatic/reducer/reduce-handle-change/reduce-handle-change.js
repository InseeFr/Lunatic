import reduceVariablesArray from './reduce-variables-array';
import reduceVariablesSimple from './reduce-variables-simple';
import reduceCleaning from './reduce-cleaning';
import reduceMissing from './reduce-missing';
import reduceResizing from './reduce-resizing';
import reduceLinksVariable from './reduce-links-variable';
import compose from '../../commons/compose';
import { createControlsReducer } from '../validate-controls';

function isOnSubPage(pager) {
	const { subPage } = pager;
	return subPage !== undefined;
}

/**
 * met à jour variables qui contient les valeur collectées
 * @param {*} state
 * @param {*} action
 * @returns
 */
function updateVariables(state, action) {
	const { payload } = action;
	const { response, value, args = {} } = payload;
	const { name } = response;
	const {
		loop,
		index,
		length,
		linksIterations,
		paginatedLoop,
		shallowIteration,
	} = args;

	const { pager, variables } = state;
	const { nbIterations, iteration } = pager;

	if (linksIterations !== undefined) {
		const variablesNext = reduceLinksVariable(variables, {
			name,
			value,
			linksIterations,
		});
		return { ...state, variables: variablesNext };
	} else if (loop && paginatedLoop) {
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
		if (loop)
			return {
				...state,
				variables: variablesNext,
				pager: { ...pager, shallowIteration },
			};
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
	const { response, value } = payload;
	const { name } = response;
	const { updateBindings } = state;

	updateBindings(name, value);

	return state;
}

const reducers = compose(
	updateVariables,
	updateBindings,
	reduceResizing,
	reduceMissing,
	reduceCleaning
);

/**
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
function reduceHandleChange(state, action) {
	return reducers(state, action);
}

export default createControlsReducer(reduceHandleChange);
