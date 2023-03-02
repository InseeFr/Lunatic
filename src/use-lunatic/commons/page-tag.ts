import { LunaticState } from '../type';
import { deepCompare } from '../../utils/array';

/**
 * Serialize the position in the pager (ex: 2.1#1.1)
 */
export function getPageTag(pager: LunaticState['pager']): string {
	const { page, iteration } = pager;
	if (iteration.length > 0) {
		return `${page.join('.')}#${iteration.map((v) => v + 1).join('.')}`;
	}

	return page.join('.');
}

export function getPagerFromPageTag(
	pageTag: string
): Pick<LunaticState['pager'], 'page' | 'iteration'> {
	const pattern = /(?<page>((\d+\.?)+))#?(?<iteration>(\d+\.?)+)?/g;
	const match = [...(pageTag?.matchAll(pattern) as any)] as
		| [
				{
					groups: {
						page?: string;
						iteration?: string;
					};
				}
		  ]
		| [];

	if (match.length === 0) {
		return {
			page: [1],
			iteration: [],
		};
	}

	const groups = match[0].groups;

	return {
		page: groups.page?.split('.').map((v) => parseInt(v, 10)) ?? [1],
		iteration:
			groups.iteration?.split('.').map((v) => parseInt(v, 10) - 1) ?? [],
	};
}

export function isNewReachedPage(
	pager: Pick<LunaticState['pager'], 'lastReachedPage' | 'page' | 'iteration'>
): boolean {
	const { lastReachedPage, page, iteration } = pager;

	// The reached page is greater
	const pageComparison = deepCompare(page, lastReachedPage.page);
	if (pageComparison === 1) {
		return true;
	}

	// We are on the same page, compare the iteration level
	return (
		pageComparison === 0 &&
		deepCompare(iteration, lastReachedPage.iteration) === 1
	);
}

export function getNewReachedPage(pager: LunaticState['pager']) {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}
