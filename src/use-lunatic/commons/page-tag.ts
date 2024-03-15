import type { LunaticState, PageTag } from '../type';

/**
 * Generate page name from the pager
 */
export function getPageTag(pager: LunaticState['pager']): PageTag {
	const { page, subPage, iteration } = pager;
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}`;
	}

	return `${page}`;
}

export function getPagerFromPageTag(pageTag: string | number = 1) {
	if (typeof pageTag === 'number') {
		return { page: pageTag };
	}
	const pattern =
		/(?<page>\d+)\.?(?<subPagePlusUn>\d+)?#?(?<iterationPlusUn>\d+)?/g;
	const match = [...(pageTag?.toString().matchAll(pattern) as any)] as
		| [
				{
					groups: {
						page: string;
						subPagePlusUn: string;
						iterationPlusUn: string;
					};
				},
		  ]
		| [];
	if (match.length === 0) {
		return null;
	}
	const [
		{
			groups: { page, subPagePlusUn, iterationPlusUn },
		},
	] = match;
	if (!subPagePlusUn) {
		return { page: parseInt(page, 10) };
	}
	return {
		page: parseInt(page, 10),
		subPage: parseInt(subPagePlusUn, 10) - 1,
		iteration: parseInt(iterationPlusUn, 10) - 1,
	};
}

export function isNewReachedPage(pager: LunaticState['pager']): boolean {
	const { lastReachedPage, page, subPage, iteration } = pager;
	const reachedPager = getPagerFromPageTag(lastReachedPage ?? '0');

	if (!reachedPager) {
		return false;
	}

	if (page > reachedPager.page) {
		return true;
	}

	if ((subPage ?? 0) > (reachedPager.subPage ?? 0)) {
		return true;
	}

	if ((iteration ?? 0) > (reachedPager.iteration ?? 0)) {
		return true;
	}

	return false;
}

export function getNewReachedPage(
	pager: LunaticState['pager']
): PageTag | undefined {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}
