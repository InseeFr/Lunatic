import { executeConditionFilter, getComponentsFromState } from '../commons';
import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';
import { LunaticState } from '../type';
import { isPageEmpty, pageStringToNumbers } from '../commons/page';
import { getNextPager } from './commons/page-navigation';
import { resizeArray } from '../../utils/array';

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, pager, executeExpression } = state;
	const nextPager = getNextPager(pager);
	const pageId = nextPager.page.join('.');
	let nextPage = pages[pageId];

	if (!nextPage) {
		throw new Error(`Cannot reach next page ${pageId}`);
	}

	// We reached a loop, go inside
	while (nextPage.isLoop && nextPage.subPages && nextPage.subPages.length > 0) {
		nextPager.page = pageStringToNumbers(nextPage.subPages[0]);
		nextPager.maxPage = [
			...resizeArray(nextPager.maxPage, nextPager.page.length - 1, 1),
			nextPage.subPages.length,
		];
		nextPager.maxIteration = [
			...resizeArray(nextPager.maxIteration, nextPager.iteration.length, 0),
			executeExpression<number>(nextPage.iterations, {
				iteration: nextPager.iteration,
			}) - 1,
		];
		nextPager.iteration = [...nextPager.iteration, 0];
		nextPage = pages[nextPager.page.join('.')];
	}

	const newState = { ...state, pager: nextPager };

	// We reached an empty page, fast forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return newState;
}

export default createModalControlsReducer(
	createControlsReducer(reduceGoNextPage)
);
