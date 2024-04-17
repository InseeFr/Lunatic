import type { LunaticReducerState, PageTag } from '../type';

/**
 * Generate page name from the pager
 */
export function getPageTag(pager: LunaticReducerState['pager']): PageTag {
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

export function isNewReachedPage(pager: LunaticReducerState['pager']): boolean {
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
	pager: LunaticReducerState['pager']
): PageTag | undefined {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}

/**
 * Comparison function for pageTag
 * - negative if a comes before b
 * - positive if a comes after b
 * - 0 if a is the same as b
 */
export function pageTagComparator(a: PageTag, b: PageTag) {
	const pageA = a.split(/\D/).map((v) => parseInt(v, 10));
	const pageB = b.split(/\D/).map((v) => parseInt(v, 10));
	// [0, 2, 1] is used to extract the significant part of the pageTag part (start with page, then iteration, then subpage)
	for (const index of [0, 2, 1]) {
		if (pageA[index] !== pageB[index]) {
			return (pageA[index] ?? -1) - (pageB[index] ?? -1);
		}
	}
	return 0;
}
