import { ActionGoNextPage } from '../actions';
import { getNewReachedPage } from '../commons';
import compose from '../commons/compose';
import { LunaticState } from '../type';
import { overviewOnChange } from './overview/overview-on-change';
import { getNextPager } from '../commons/page-navigation';
import { getPageId, isPageEmpty } from '../commons/page';
import { autoExploreLoop } from './commons/auto-explore-loop';

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, pager } = state;
	const parentType = pages[pager.page]?.components[0].componentType;
	const nextPager = getNextPager(pager, parentType);
	const pageId = getPageId(nextPager);

	if (!pages[pageId]) {
		throw new Error(`Cannot reach next page ${pageId}`);
	}

	// If we reached a loop, go inside
	const newState = autoExploreLoop({ ...state, pager: nextPager }, 'forward');

	// We reached an empty page, move forward
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return {
		...newState,
		pager: {
			...newState.pager,
			lastReachedPage: getNewReachedPage(newState.pager),
		},
	};
}

export default compose<ActionGoNextPage>(reduceGoNextPage, overviewOnChange);
