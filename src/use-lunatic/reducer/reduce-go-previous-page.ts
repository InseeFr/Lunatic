import { getPrevPager } from '../commons/page-navigation';
import { autoExploreLoop } from './commons/auto-explore-loop';
import { getPageId, isPageEmpty } from '../commons/page';
import type { LunaticReducerState } from '../type';

export function reduceGoPreviousPage(
	state: LunaticReducerState
): LunaticReducerState {
	const { pages, pager } = state;
	const parentType = pages[pager.page]?.components[0].componentType;
	const prevPager = getPrevPager(pager, parentType);
	const pageId = getPageId(prevPager);
	const prevPage = pages[pageId];

	if (!prevPage) {
		throw new Error(`Cannot reach previous page ${pageId}`);
	}

	let newState = { ...state, pager: prevPager };

	// We reached an empty page, keep going backward
	if (isPageEmpty(newState, true)) {
		return reduceGoPreviousPage(newState);
	}

	// If we reached a loop, go to the last iteration / sequence
	newState = autoExploreLoop(newState, 'backward');

	// We explored a loop, check if we reached an empty page, move backward
	if (newState.pager !== prevPager && isPageEmpty(newState, true)) {
		return reduceGoPreviousPage(newState);
	}

	return {
		...newState,
		previousPager: state.pager,
		isInLoop: newState.pager.iteration !== undefined,
	};
}
