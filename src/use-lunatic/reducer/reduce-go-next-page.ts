import { executeConditionFilter, getComponentsFromState } from '../commons';
import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';
import { LunaticState } from '../type';
import { pageStringToNumbers } from '../commons/page';
import { getNextPager } from './commons/page-navigation';

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, pager, executeExpression } = state;
	const { page } = pager;
	const nextPager = getNextPager(pager);
	const nextPage = pages[nextPager.page.join('.')];

	if (!nextPage) {
		throw new Error('Cannot retrieve information for the next page');
	}

	// We reached a loop, go inside
	if (nextPage.isLoop && nextPage.subPages && nextPage.subPages.length > 0) {
		nextPager.page = pageStringToNumbers(nextPage.subPages[0]);
		nextPager.maxPage = [...nextPager.maxPage, nextPage.subPages.length];
		nextPager.iteration = [...nextPager.iteration, 0];
		nextPager.maxIteration = [
			...nextPager.maxIteration,
			executeExpression<number>(nextPage.iterations, {
				iteration: pager.iteration,
			}) - 1,
		];
	}

	const newState = { ...state, pager: nextPager };

	// We reached an empty page, fast forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return newState;
}

/**
 * Check if we are on an empty page
 * if no components can be displayed on this page
 */
function isPageEmpty(state: LunaticState): boolean {
	const { executeExpression, pager } = state;
	const { iteration } = pager;
	const components = getComponentsFromState(state);
	// Find visible components
	return (
		components.filter(function (component) {
			const { conditionFilter } = component;
			if (conditionFilter) {
				return executeConditionFilter(
					conditionFilter,
					executeExpression,
					iteration
				);
			}
			return true;
		}).length === 0
	);
}

export default createModalControlsReducer(
	createControlsReducer(reduceGoNextPage)
);
