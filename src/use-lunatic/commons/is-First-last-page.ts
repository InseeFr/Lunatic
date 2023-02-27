import { LunaticState } from '../type';

function isFirstLastPage(pager: LunaticState['pager']) {
	const { page, maxPage } = pager;
	const isFirstPage = page[0] === 1;
	const isLastPage = page[0] === maxPage[0];
	return { isFirstPage, isLastPage };
}

export default isFirstLastPage;
