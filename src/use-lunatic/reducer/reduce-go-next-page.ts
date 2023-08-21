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

	let newState = { ...state, pager: nextPager };

	// We reached an empty page, move forward
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	// If we reached a loop, go inside
	newState = autoExploreLoop(newState, 'forward');

	// We explored a loop, check if we reached an empty page, move forward
	if (newState.pager !== nextPager && isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return {
		...newState,
		isInLoop: newState.pager.iteration !== undefined,
		pager: {
			...newState.pager,
			lastReachedPage: getNewReachedPage(newState.pager),
		},
	};
}

export default compose<ActionGoNextPage>(reduceGoNextPage, overviewOnChange);
