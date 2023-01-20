export function getPageTag(pager) {
	const { page, subPage, iteration } = pager;
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}`;
	}

	return `${page}`;
}

function getPagerFromPageTag(pageTag) {
	const pattern =
		/(?<page>\d+)\.?(?<subPagePlusUn>\d+)?#?(?<iterationPlusUn>\d+)?/g;
	const match = [...pageTag.matchAll(pattern)];
	const [
		{
			groups: { page, subPagePlusUn, iterationPlusUn },
		},
	] = match;
	return { page, subPage: subPagePlusUn - 1, iteration: iterationPlusUn - 1 };
}

export function isNewReachedPage(pager) {
	const { lastReachedPage, page, subPage, iteration } = pager;
	const reachedPager = getPagerFromPageTag(lastReachedPage);

	return (
		Number.parseInt(page) > Number.parseInt(reachedPager.page) ||
		(Number.parseInt(page) === Number.parseInt(reachedPager.page) &&
			Number.parseInt(subPage) > Number.parseInt(reachedPager.subPage) &&
			Number.parseInt(iteration) === Number.parseInt(reachedPager.iteration)) ||
		(Number.parseInt(page) === Number.parseInt(reachedPager.page) &&
			Number.parseInt(iteration) > Number.parseInt(reachedPager.iteration))
	);
}

export function getNewReachedPage(pager) {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}

export const isPageReached = (page, lastReachedPage) =>
	parseInt(page, 10) <= parseInt(lastReachedPage, 10);
