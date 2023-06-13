import { ActionGoToPage, ActionKind } from '../actions';
import { LunaticState } from '../type';
import { isOnEmptyPage } from './commons';
import reduceGoNextPage from './reduce-go-next-page';
import { getPagerFromPageTag } from '../commons/page-tag';

function validateChange(state: LunaticState) {
	if (isOnEmptyPage(state)) {
		return reduceGoNextPage(state, {
			type: ActionKind.GO_NEXT_PAGE,
			payload: {},
		});
	}
	return state;
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
	let newState = { ...state };

	// The page contains non digit, extract information from it
	if (action.payload.page.match(/\D/)) {
		const pager = getPagerFromPageTag(action.payload.page);
		if (pager) {
			action.payload.iteration = pager.iteration;
			action.payload.subPage = pager.subPage;
			action.payload.page = pager.page;
		}
	}

	// The page is still not a number, cancel the action
	if (action.payload.page.match(/\D/)) {
		console.error(`Cannot reach page "${action.payload.page}", not a number`);
		return state;
	}

	if (action.payload.iteration !== undefined) {
		return resolveSubPage(state, action);
	}

	if (!isInLoop)
		newState = {
			...state,
			pager: {
				...pager,
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
				page: action.payload.page,
			},
		};
	// TODO: fix when redirect to loop component
	// How to calculate nbSubPages & nbIterations?
	// How to calculate lazy variables we need?
	// Handle setLoopBindings with the good iteration
	return validateChange(newState);
}

export default reduceGoToPage;
