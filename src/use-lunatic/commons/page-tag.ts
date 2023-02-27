import { LunaticState } from '../type';

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

/**
 * Compare 2 positions as array
 */
function positionIsGreater(a: number[], b: number[]): boolean {
	if ((a[0] ?? -1) > (b[0] ?? -1)) {
		return true;
	}
	if (a.length === 1 || b.length === 1) {
		return a.length > b.length;
	}
	return positionIsGreater(a.slice(1), b.slice(1));
}

export function isNewReachedPage(
	pager: Pick<LunaticState['pager'], 'lastReachedPage' | 'page' | 'iteration'>
): boolean {
	const { lastReachedPage, page, iteration } = pager;
	const lastReached = getPagerFromPageTag(lastReachedPage ?? '0');

	// The reached page is greater
	if (positionIsGreater(page, lastReached.page)) {
		return true;
	}

	// We are on the same page, compare the iteration level
	return (
		page.join('.') === lastReached.page.join('.') &&
		positionIsGreater(iteration, lastReached.iteration)
	);
}

export function getNewReachedPage(pager: LunaticState['pager']) {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}
