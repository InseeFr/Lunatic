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

function resolveSubPage(
	state: LunaticState,
	action: ActionGoToPage
): LunaticState {
	const { pager, pages } = state;
	const {
		page,
		iteration,
		nbIterations,
		subPage = 0,
		roundabout,
	} = action.payload;
	const { subPages } = pages[page] || { subPages: [] };
	const nbSubPages = subPages?.length;

	return {
		...state,
		isInLoop: true,
		pager: {
			...pager,
			page,
			iteration,
			nbIterations,
			nbSubPages,
			subPage,
			roundabout,
		},
	};
}

function reduceGoToPage(
	state: LunaticState,
	action: ActionGoToPage
): LunaticState {
	const { isInLoop, pager } = state;
	const { page: newPage, iteration } = action.payload;

	if (iteration !== undefined) {
		return resolveSubPage(state, action);
	}

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
