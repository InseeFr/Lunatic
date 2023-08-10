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

	const goInsideSubpage = (subPages: string[], nbIteration: number) => {
		const maxSubPage = subPages.length;
		const firstSubPage = pageStringToNumbers(
			subPages[isForward ? 0 : maxSubPage - 1]
		);
		newPager.page = firstSubPage[0].toString();
		newPager.subPage = firstSubPage[1] - 1; // Subpage starts at 0
		newPager.nbSubPages = maxSubPage;
		newPager.nbIterations = state.executeExpression<number>(page.iterations);
		newPager.iteration = isForward ? 0 : newPager.nbIterations - 1;
	};

	// The page is a loop
	if (page.isLoop && page.subPages && page.subPages.length > 0) {
		goInsideSubpage(
			page.subPages,
			state.executeExpression<number>(page.iterations)
		);
	}

	// The page contains a roundabout, go to the first iteration if it only has one iteration
	const firstComponent = page.components[0];
	if (
		page.components[0].componentType === 'Roundabout' &&
		page.subPages &&
		page.subPages.length > 0
	) {
		const nbIterations = state.executeExpression<number>(page.iterations);
		if (nbIterations === 1 && isForward) {
			goInsideSubpage(page.subPages, 1);
		}
	}

	return {
		...state,
		isInLoop: newPager.nbIterations !== undefined,
		pager: newPager,
	};
}
