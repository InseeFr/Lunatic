import { LunaticState } from '../../type';

/**
 * Increment the pager to reach the next page or iteration
 */
export function getNextPager(
	pager: LunaticState['pager']
): LunaticState['pager'] {
	const pageDepth = pager.page.length - 1;
	const page = [...pager.page];
	const iteration = [...pager.iteration];
	page[pageDepth]++;
	// We reached the end of the questionnaire
	if (page.length === 1 && page[pageDepth] > pager.maxPage[pageDepth]) {
		return pager;
	}
	// We reached the end of the sequence
	if (page[pageDepth] > pager.maxPage[pageDepth]) {
		page[pageDepth] = 1;
		iteration[pageDepth - 1]++;
	}
	// We reached the end of an iteration, move up
	if (iteration[pageDepth - 1] > pager.maxIteration[pageDepth - 1]) {
		page.pop();
		iteration.pop();
		return getNextPager({
			...pager,
			page,
			iteration,
		});
	}
	return {
		...pager,
		page,
		iteration,
	};
}
