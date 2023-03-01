import { LunaticState, LunaticStateVariable } from '../../type';
import { pageStringToNumbers } from '../../commons/page';
import { resizeArray } from '../../../utils/array';

/**
 * Update the pager to enter a loop if the pager is on a loop
 */
export function autoExploreLoop(
	state: LunaticState,
	direction: 'forward' | 'backward' = 'forward'
): LunaticState {
	const newPager = { ...state.pager };
	const pageId = newPager.page.join('.');
	let page = state.pages[pageId];
	const isForward = direction === 'forward';
	while (page.isLoop && page.subPages && page.subPages.length > 0) {
		const maxSubPage = page.subPages.length;
		newPager.page = pageStringToNumbers(
			page.subPages[isForward ? 0 : maxSubPage - 1]
		);
		newPager.maxPage = [
			...resizeArray(newPager.maxPage, newPager.page.length - 1, 1),
			maxSubPage,
		];
		const maxSubIteration =
			state.executeExpression<number>(page.iterations, {
				iteration: newPager.iteration,
			}) - 1;
		newPager.maxIteration = [
			...resizeArray(newPager.maxIteration, newPager.iteration.length, 0),
			maxSubIteration,
		];
		newPager.iteration = [
			...newPager.iteration,
			isForward ? 0 : maxSubIteration,
		];
		page = state.pages[newPager.page.join('.')];
	}
	return { ...state, pager: newPager };
}
