import { LunaticState } from '../type';

function isFirstLastPage(pager: LunaticState['pager']) {
	const { page, maxPage } = pager;
	const isFirstPage = page === '1';
	const isLastPage = page === maxPage;
	return { isFirstPage, isLastPage };
}

export default isFirstLastPage;
