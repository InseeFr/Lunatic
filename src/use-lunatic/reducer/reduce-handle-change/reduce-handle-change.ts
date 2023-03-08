import reduceVariablesArray from './reduce-variables-array';
import reduceVariablesSimple from './reduce-variables-simple';
import reduceCleaning from './reduce-cleaning';
import reduceMissing from './reduce-missing';
import reduceResizing from './reduce-resizing';
import reduceLinksVariable from './reduce-links-variable';
import compose from '../../commons/compose';
import { createControlsReducer } from '../validate-controls';
import { ActionHandleChange } from '../../actions';
import { LunaticState } from '../../type';
import { toNumber } from '../../../utils/to-number';

/**
 * Update collected variables
 */
function updateVariables(
	state: LunaticState,
	action: ActionHandleChange
): LunaticState {
	const { payload } = action;
	const { response, value, args = {} } = payload;
	const { name } = response;
	const { loop, linksIterations, symLinks, shallowIteration, lengths } = args;

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
	} else if (pager.iteration.length > 0) {
		const variablesNext = reduceVariablesArray(variables, {
			name,
			value,
			iteration: pager.iteration,
			maxIteration: pager.maxIteration,
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

const reducers = compose<LunaticState, [ActionHandleChange]>(
	updateVariables,
	updateBindings,
	reduceResizing,
	reduceMissing,
	reduceCleaning
);

function reduceHandleChange(state: LunaticState, action: ActionHandleChange) {
	return reducers(state, action);
}

export default createControlsReducer(reduceHandleChange);
