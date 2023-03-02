import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';
import { LunaticState } from '../type';
import { isPageEmpty } from '../commons/page';
import { getNextPager } from './commons/page-navigation';
import { autoExploreLoop } from './commons/auto-explore-loop';

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, pager } = state;
	const parentPage = pages[pager.page.slice(0, -1).join('.')];
	const nextPager = getNextPager(pager, {
		moveUpWhenSequenceEnd:
			parentPage?.components[0]?.componentType === 'Roundabout',
	});
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
