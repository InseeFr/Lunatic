import { LunaticState } from '../type';

/**
 * Generate page name from the pager
 */
export function getPageTag(pager: LunaticState['pager']): string {
	const { page, subPage, iteration, nbIterations } = pager;
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}|${nbIterations}`;
	}

	return `${page}`;
}

function safeParseInt(numb?: string, how: number = 0) {
	if (numb) {
		return parseInt(numb, 10) + how;
	}
	return undefined;
}

export function getPagerFromPageTag(pageTag: string = '1') {
	const pattern =
		/(?<page>\d+)\.?(?<subPagePlusUn>\d+)?#?(?<iterationPlusUn>\d+)?\|?(?<nbIterations>\d+)/g;
	const match = [...(pageTag?.matchAll(pattern) as any)] as
		| [
				{
					groups: {
						page: string;
						subPagePlusUn: string;
						iterationPlusUn: string;
						nbIterations: string;
					};
				}
		  ]
		| [];
	if (match.length === 0) {
		return null;
	}
	const [
		{
			groups: { page, subPagePlusUn, iterationPlusUn, nbIterations },
		},
	] = match;
	return {
		page,
		subPage: safeParseInt(subPagePlusUn, -1),
		iteration: safeParseInt(iterationPlusUn, -1),
		nbIterations: safeParseInt(nbIterations),
	};
}

/*
 * Est-ce vraiment utilisé ?
 */
export function isNewReachedPage(pager: LunaticState['pager']): boolean {
	const { lastReachedPage, page, subPage, iteration } = pager;
	const reachedPager = getPagerFromPageTag(lastReachedPage ?? '0');

	return false;
	// if (!reachedPager) {
	// 	return false;
	// }

	// return (
	// 	Number.parseInt(page) > Number.parseInt(reachedPager.page.toString()) ||
	// 	(Number.parseInt(page) === Number.parseInt(reachedPager.page.toString()) &&
	// 		Number.parseInt(subPage?.toString() ?? '-1') >
	// 			Number.parseInt(reachedPager.subPage.toString()) &&
	// 		Number.parseInt(iteration?.toString() ?? '-1') ===
	// 			Number.parseInt(reachedPager.iteration.toString())) ||
	// 	(Number.parseInt(page) === Number.parseInt(reachedPager.page.toString()) &&
	// 		Number.parseInt(iteration?.toString() ?? '-1') >
	// 			Number.parseInt(reachedPager.iteration.toString()))
	// );
}

export function getNewReachedPage(pager: LunaticState['pager']) {
	return isNewReachedPage(pager) ? getPageTag(pager) : pager.lastReachedPage;
}
