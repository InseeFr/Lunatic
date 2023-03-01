import { executeConditionFilter, getComponentsFromState } from '../commons';
import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';
import { LunaticState } from '../type';
import { isPageEmpty, pageStringToNumbers } from '../commons/page';
import { getNextPager } from './commons/page-navigation';
import { resizeArray } from '../../utils/array';
import { autoExploreLoop } from './commons/auto-explore-loop';

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, pager, executeExpression } = state;
	const nextPager = getNextPager(pager);
	const pageId = nextPager.page.join('.');
	let nextPage = pages[pageId];

	if (!nextPage) {
		throw new Error(`Cannot reach next page ${pageId}`);
	}

	// We reached a loop, go inside
	const newState = autoExploreLoop({ ...state, pager: nextPager }, 'forward');

	// We reached an empty page, fast forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return newState;
}

export default createModalControlsReducer(
	createControlsReducer(reduceGoNextPage)
);
