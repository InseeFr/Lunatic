import { LunaticState } from '../type';
import { getPrevPager } from './commons/page-navigation';
import { isPageEmpty, pageStringToNumbers } from '../commons/page';
import { resizeArray } from '../../utils/array';
import { autoExploreLoop } from './commons/auto-explore-loop';

function reduceGoPreviousPage(state: LunaticState): LunaticState {
	const { pages, pager, executeExpression } = state;
	let prevPager = getPrevPager(pager);
	const pageId = prevPager.page.join('.');
	let prevPage = pages[pageId];

	if (!prevPage) {
		throw new Error(`Cannot reach previous page ${pageId}`);
	}

	// If we reached a loop, go to the last iteration / sequence
	const newState = autoExploreLoop({ ...state, pager: prevPager }, 'backward');

	// We reached an empty page, fast-forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoPreviousPage(newState);
	}

	return newState;
}

export default reduceGoPreviousPage;
