import { createModalControlsReducer } from './validate-controls';
import { LunaticState } from '../type';
import { ActionGoToPage, ActionKind } from '../actions';
import { autoExploreLoop } from './commons/auto-explore-loop';
import { isPageEmpty } from '../commons/page';
import reduceGoNextPage from './reduce-go-next-page';

function reduceGoToPage(
	state: LunaticState,
	action: ActionGoToPage
): LunaticState {
	const pager = {
		...state.pager,
		page: action.payload.page,
		iteration: action.payload.iteration,
	};

	if (pager.iteration.length > pager.page.length - 1) {
		throw new Error('Iteration length does not match page depth');
	}

	pager.maxPage = [
		// First level page count never change
		pager.maxPage[0],
		// For each page compute the subpage length
		...pager.page.slice(0, -1).map((_, k) => {
			const page = pager.page.slice(0, k + 1).join('.');
			return state.pages[page]?.subPages?.length ?? 0;
		}),
	];

	// Loop through each page (starting from root, to find the iteration expression to compute each length)
	pager.maxIteration = pager.page.slice(0, -1).map((_, k) => {
		// Compute intermediary iteration / page
		const pageIndex = pager.page.slice(0, k + 1).join('.');
		const iteration = pager.iteration.slice(0, k);
		// Extract the expression from the page
		const iterationExpression = state.pages[pageIndex].iterations;
		if (!iterationExpression) {
			return 0;
		}
		// Find the length for the current iteration
		return (
			state.executeExpression<number>(iterationExpression, { iteration }) - 1
		);
	});

	const newState = autoExploreLoop({
		...state,
		pager,
	});

	// We reached an empty page, fast-forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState, {
			type: ActionKind.GO_NEXT_PAGE,
			payload: {},
		});
	}
	return newState;
}

export default createModalControlsReducer(reduceGoToPage);
