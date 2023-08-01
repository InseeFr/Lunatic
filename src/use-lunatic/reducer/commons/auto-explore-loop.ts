import { LunaticState } from '../../type';
import { getPageId, pageStringToNumbers } from '../../commons/page';

/**
 * Update the pager to enter a loop if the pager is on a loop
 */
export function autoExploreLoop(
	state: LunaticState,
	direction: 'forward' | 'backward' = 'forward'
): LunaticState {
	const newPager = {
		...state.pager,
	};
	const pageId = getPageId(newPager);
	let page = state.pages[pageId];
	const isForward = direction === 'forward';
	// The page is a loop
	if (page.isLoop && page.subPages && page.subPages.length > 0) {
		const maxSubPage = page.subPages.length;
		const firstSubPage = pageStringToNumbers(
			page.subPages[isForward ? 0 : maxSubPage - 1]
		);
		newPager.page = firstSubPage[0].toString();
		newPager.subPage = firstSubPage[1] - 1; // Subpage starts at 0
		newPager.nbSubPages = maxSubPage;
		newPager.nbIterations = state.executeExpression<number>(page.iterations);
		newPager.iteration = isForward ? 0 : newPager.nbIterations - 1;
	}
	return {
		...state,
		isInLoop: newPager.nbIterations !== undefined,
		pager: newPager,
	};
}
