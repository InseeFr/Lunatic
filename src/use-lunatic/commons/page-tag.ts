import { LunaticState } from '../type';

/**
 * Generate page name from the pager
 */
export function getPageTag(pager: LunaticState['pager']): string {
	const { page, subPage, iteration } = pager;
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}`;
	}

	return `${page}`;
}

function getPagerFromPageTag(pageTag: string) {
	const pattern =
		/(?<page>\d+)\.?(?<subPagePlusUn>\d+)?#?(?<iterationPlusUn>\d+)?/g;
	const match = [...(pageTag?.matchAll(pattern) as any)] as [
		{ groups: { page: number; subPagePlusUn: number; iterationPlusUn: number } }
	];
	const [
		{
			groups: { page, subPagePlusUn, iterationPlusUn },
		},
	] = match;
	return { page, subPage: subPagePlusUn - 1, iteration: iterationPlusUn - 1 };
}

export function isNewReachedPage(pager: LunaticState['pager']) {
	const { lastReachedPage, page, subPage, iteration } = pager;
	const reachedPager = getPagerFromPageTag(lastReachedPage ?? '0');

	return (
		Number.parseInt(page) > Number.parseInt(reachedPager.page.toString()) ||
		(Number.parseInt(page) === Number.parseInt(reachedPager.page.toString()) &&
			Number.parseInt(subPage?.toString() ?? '-1') >
				Number.parseInt(reachedPager.subPage.toString()) &&
			Number.parseInt(iteration?.toString() ?? '-1') ===
				Number.parseInt(reachedPager.iteration.toString())) ||
		(Number.parseInt(page) === Number.parseInt(reachedPager.page.toString()) &&
			Number.parseInt(iteration?.toString() ?? '-1') >
				Number.parseInt(reachedPager.iteration.toString()))
	);
}

export function getNewReachedPage(pager: LunaticState['pager']) {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}
