import { isOnEmptyPage } from './commons';
import { getPageTag } from '../commons';
import { createModalControlsReducer } from './validate-controls';
import reduceGoNextPage from './reduce-go-next-page';
import { LunaticState } from '../type';
import { ActionGoToPage, ActionKind } from '../actions';

function validateChange(state: LunaticState) {
	const { pager, errors } = state;
	const currentErrors =
		errors !== undefined ? errors[getPageTag(pager)] : undefined;
	const updatedState = { ...state, currentErrors } satisfies LunaticState;
	if (isOnEmptyPage(updatedState)) {
		return reduceGoNextPage(updatedState, {
			type: ActionKind.GO_NEXT_PAGE,
			payload: {},
		});
	}
	return updatedState;
}

function reduceGoToPage(
	state: LunaticState,
	action: ActionGoToPage
): LunaticState {
	const { isInLoop, pager } = state;
	const {
		payload: { page: newPage },
	} = action;
	if (!isInLoop)
		return {
			...state,
			pager: {
				...pager,
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
				page: newPage,
			},
		};
	// TODO: fix when redirect to loop component
	// How to calculate nbSubPages & nbIterations?
	// How to calculate lazy variables we need?
	// Handle setLoopBindings with the good iteration
	return validateChange(state);
}

export default createModalControlsReducer(reduceGoToPage);
