import type { LunaticReducerState } from '../type';

function isFirstLastPage(pager: LunaticReducerState['pager']) {
	const { page, maxPage } = pager;
	const isFirstPage = page === 1;
	const isLastPage = page === maxPage;
	return { isFirstPage, isLastPage };
}

export default isFirstLastPage;
