import { type ActionGoToPage } from '../actions';
import { getPageId, isPageEmpty } from '../commons/page';
import { getPagerFromPageTag } from '../commons/page-tag';
import type { LunaticReducerState } from '../type';
import { reduceGoNextPage } from './reduce-go-next-page';

export function reduceGoToPage(
	state: LunaticReducerState,
	action: ActionGoToPage
): LunaticReducerState {
	// The page contains non digit, extract information from it
	if (typeof action.payload.page === 'string') {
		const pager = getPagerFromPageTag(action.payload.page);
		if (!pager) {
			console.error(`Cannot reach page "${action.payload.page}", not a number`);
			return state;
		}
		action.payload.iteration = pager.iteration;
		action.payload.subPage = pager.subPage;
		action.payload.page = pager.page;
	}

	const newPager: LunaticReducerState['pager'] = {
		...state.pager,
		page: action.payload.page,
		subPage: action.payload.subPage,
		iteration: action.payload.iteration,
		nbIterations: undefined,
		nbSubPages: undefined,
	};

	// The page is not reachable
	const pageId = getPageId(newPager);
	if (!(pageId in state.pages)) {
		console.error(`Page "${pageId}" does not exists in this questionnaire`);
		return state;
	}

	// Find the number of subPages and iteration
	const parentPage = state.pages[action.payload.page];
	if (action.payload.subPage !== undefined && parentPage.iterations) {
		newPager.nbSubPages = parentPage.subPages?.length;
		newPager.nbIterations = state.executeExpression<number>(
			parentPage.iterations
		);
	}

	// Prevent an out of bound iteration
	if (
		newPager.iteration !== undefined &&
		newPager.nbIterations !== undefined &&
		newPager.iteration >= newPager.nbIterations
	) {
		newPager.iteration = newPager.nbIterations - 1;
	}

	// Move forward if the page is empty
	const newState = {
		...state,
		previousPager: state.pager,
		isInLoop: newPager.nbIterations !== undefined,
		pager: newPager,
	};
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return newState;
}
