import { toNumber } from '../../../utils/to-number';
import { ActionHandleChange } from '../../actions';
import compose from '../../commons/compose';
import { LunaticState } from '../../type';
import reduceCleaning from './reduce-cleaning';
import reduceLinksVariable from './reduce-links-variable';
import reduceMissing from './reduce-missing';
import reduceResizing from './reduce-resizing';
import reduceVariablesArray from './reduce-variables-array';
import reduceVariablesSimple from './reduce-variables-simple';

function isOnSubPage(
	pager: LunaticState['pager']
): pager is LunaticState['pager'] & {
	nbIterations: number;
	iteration: number;
} {
	const { subPage } = pager;
	return subPage !== undefined;
}

/**
 * Met à jour les variables collectés
 */
function updateVariables(
	state: LunaticState,
	action: ActionHandleChange
): LunaticState {
	const { payload } = action;
	const { response, value, args = {} } = payload;
	const { name } = response;
	const {
		loop,
		index,
		length,
		linksIterations,
		symLinks,
		paginatedLoop,
		shallowIteration,
		lengths,
	} = args;

	const { pager, variables } = state;

	if (linksIterations !== undefined) {
		const variablesNext = reduceLinksVariable(variables, {
			name,
			value: typeof value === 'string' ? value : '',
			linksIterations,
			symLinks,
			lengths,
		});
		return { ...state, variables: variablesNext };
	} else if (loop && paginatedLoop && index && length) {
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
			index: pager.iteration,
			length: pager.nbIterations,
		});

		return { ...state, variables: variablesNext };
	} else {
		const variablesNext = reduceVariablesSimple(variables, { name, value });
		if (loop)
			return {
				...state,
				variables: variablesNext,
				pager: {
					...pager,
					shallowIteration: toNumber(shallowIteration) ?? undefined,
				},
			};
		return { ...state, variables: variablesNext };
	}
}

/**
 * Met à jour les bindings (maps des valeurs)
 */
function updateBindings(state: LunaticState, action: ActionHandleChange) {
	const { payload } = action;
	const { response } = payload;
	const { name } = response;
	const { updateBindings: ub } = state;
	const { variables } = state;
	const variable = variables[name];
	const { value } = variable;

	ub(name, value);

	return state;
}

const reducers = compose<ActionHandleChange>(
	updateVariables,
	updateBindings,
	reduceResizing,
	reduceMissing,
	reduceCleaning
);

function reduceHandleChange(state: LunaticState, action: ActionHandleChange) {
	return reducers(state, action);
}

export default reduceHandleChange;
