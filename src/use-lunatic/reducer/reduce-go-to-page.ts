import { ActionGoToPage, ActionKind } from '../actions';
import { getPagerFromPageTag } from '../commons/page-tag';
import { LunaticState } from '../type';
import reduceGoNextPage from './reduce-go-next-page';
import { getPageId, isPageEmpty } from '../commons/page';

function reduceGoToPage(
	state: LunaticState,
	action: ActionGoToPage
): LunaticState {
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

	const newPager: LunaticState['pager'] = {
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
	if (action.payload.subPage !== undefined) {
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
		isInLoop: newPager.nbIterations !== undefined,
		pager: newPager,
	};
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return newState;
}

export default reduceGoToPage;
