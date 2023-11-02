import { getNewReachedPage } from '../commons';
import { getPageId, isPageEmpty } from '../commons/page';
import { getNextPager } from '../commons/page-navigation';
import type { LunaticState } from '../type';
import { autoExploreLoop } from './commons/auto-explore-loop';
import { overviewOnChange } from './overview/overview-on-change';

function reduceGoNext(state: LunaticState): LunaticState {
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
		return reduceGoNext(newState);
	}

	// If we reached a loop, go inside
	newState = autoExploreLoop(newState, 'forward');

	// We explored a loop, check if we reached an empty page, move forward
	if (newState.pager !== nextPager && isPageEmpty(newState)) {
		return reduceGoNext(newState);
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

export const reduceGoNextPage = (state: LunaticState) => {
	return overviewOnChange(reduceGoNext(state));
};
