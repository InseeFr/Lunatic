import { ActionGoToPage, ActionKind } from '../actions';
import { LunaticState } from '../type';
import { isOnEmptyPage } from './commons';
import reduceGoNextPage from './reduce-go-next-page';
import { getPagerFromPageTag } from '../commons/page-tag';

function validateChange(state: LunaticState) {
	const updatedState = { ...state } satisfies LunaticState;
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
	const parsed = getPagerFromPageTag(page);
	const rootPage = parsed ? parsed.page : '1';
	const { subPages } = pages[rootPage] || { subPages: [] };
	const nbSubPages = subPages?.length;
	return {
		...state,
		isInLoop: true,
		pager: {
			...pager,
			page: rootPage,
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

export default reduceGoToPage;
