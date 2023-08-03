import { LunaticState } from '../type';
import { getPrevPager } from '../commons/page-navigation';
import { autoExploreLoop } from './commons/auto-explore-loop';
import { getPageId, isPageEmpty } from '../commons/page';

function reduceGoPreviousPage(state: LunaticState): LunaticState {
	const { pages, pager } = state;
	const parentType = pages[pager.page]?.components[0].componentType;
	const prevPager = getPrevPager(pager, parentType);
	const pageId = getPageId(prevPager);
	let prevPage = pages[pageId];

	if (!prevPage) {
		throw new Error(`Cannot reach previous page ${pageId}`);
	}

	// If we reached a loop, go to the last iteration / sequence
	const newState = autoExploreLoop({ ...state, pager: prevPager }, 'backward');

	// We reached an empty page, keep going backward
	if (isPageEmpty(newState)) {
		return reduceGoPreviousPage(newState);
	}

	return newState;
}

export default reduceGoPreviousPage;
