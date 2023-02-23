import { LunaticState } from '../type';
import { getPrevPager } from './commons/page-navigation';
import { isPageEmpty, pageStringToNumbers } from '../commons/page';

function reduceGoPreviousPage(state: LunaticState): LunaticState {
	const { pages, pager, executeExpression } = state;
	const prevPager = getPrevPager(pager);
	const pageId = prevPager.page.join('.');
	let prevPage = pages[pageId];

	if (!prevPage) {
		throw new Error(`Cannot reach previous page ${pageId}`);
	}

	// If we reached a loop, go to the last iteration / sequence
	while (prevPage.isLoop && prevPage.subPages && prevPage.subPages.length > 0) {
		prevPager.page = pageStringToNumbers(
			prevPage.subPages[prevPage.subPages.length - 1]
		);
		prevPager.maxPage = [...prevPager.maxPage, prevPage.subPages.length];
		const maxIteration =
			executeExpression<number>(prevPage.iterations, {
				iteration: pager.iteration,
			}) - 1;
		prevPager.iteration = [...prevPager.iteration, maxIteration];
		prevPager.maxIteration = [...prevPager.maxIteration, maxIteration];
		prevPage = pages[prevPager.page.join('.')];
	}

	const newState = { ...state, pager: prevPager };

	// We reached an empty page, fast-forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoPreviousPage(newState);
	}

	return newState;
}

export default reduceGoPreviousPage;
