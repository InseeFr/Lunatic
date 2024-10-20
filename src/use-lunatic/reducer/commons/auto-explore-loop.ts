import type { LunaticReducerState } from '../../type';
import { getPageId, pageStringToNumbers } from '../../commons/page';

/**
 * Update the pager to enter a loop if the pager is on a loop
 */
export function autoExploreLoop(
	state: LunaticReducerState,
	direction: 'forward' | 'backward' = 'forward'
): LunaticReducerState {
	const newPager = {
		...state.pager,
	};
	const pageId = getPageId(newPager);
	const page = state.pages[pageId];
	let hasExploredLoop = false;
	const isForward = direction === 'forward';

	const goInsideSubpage = (subPages: string[], nbIteration: number) => {
		// For empty loop jump to the next page
		if (nbIteration === 0) {
			newPager.page += isForward ? 1 : -1;
			hasExploredLoop = true;
			return;
		}
		const maxSubPage = subPages.length;
		const firstSubPage = pageStringToNumbers(
			subPages[isForward ? 0 : maxSubPage - 1]
		);
		newPager.page = firstSubPage[0];
		newPager.subPage = firstSubPage[1] - 1; // Subpage starts at 0
		newPager.nbSubPages = maxSubPage;
		newPager.nbIterations = nbIteration;
		newPager.iteration = isForward ? 0 : newPager.nbIterations - 1;
		hasExploredLoop = true;
	};

	// The page is a loop
	if (page.isLoop && page.subPages && page.subPages.length > 0) {
		goInsideSubpage(
			page.subPages,
			state.executeExpression<number>(page.iterations)
		);
	}

	// The page contains a roundabout, go to the first iteration if it only has one iteration
	if (
		page.components[0].componentType === 'Roundabout' &&
		page.subPages &&
		page.subPages.length > 0
	) {
		const nbIterations = state.executeExpression<number>(page.iterations);
		if (nbIterations === 1) {
			goInsideSubpage(page.subPages, 1);
		}
	}

	// No loop were explored, don't mutate the state
	if (!hasExploredLoop) {
		return state;
	}

	return {
		...state,
		isInLoop: newPager.nbIterations !== undefined,
		pager: newPager,
	};
}
