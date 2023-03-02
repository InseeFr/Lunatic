import { LunaticState } from '../../type';

/**
 * Increment the pager to reach the next page or iteration
 */
export function getNextPager(
	pager: LunaticState['pager'],
	localOptions: {
		// Move up instead of going to the next iteration
		moveUpWhenSequenceEnd?: boolean;
	} = {}
): LunaticState['pager'] {
	const options = { moveUpWhenSequenceEnd: false, ...localOptions };
	const pageDepth = pager.page.length - 1;
	const page = [...pager.page];
	const iteration = [...pager.iteration];
	page[pageDepth]++;
	// We reached the end of the questionnaire
	if (page.length === 1 && page[pageDepth] > pager.maxPage[pageDepth]) {
		return pager;
	}
	// We reached the end of the sequence
	const isEndSequence = page[pageDepth] > pager.maxPage[pageDepth];
	// Move up at the end of a sequence (for roundabout)
	if (isEndSequence && options.moveUpWhenSequenceEnd) {
		page.pop();
		iteration.pop();
		return {
			...pager,
			page,
			iteration,
		};
	}
	// Move to the next parent page (for loops)
	if (isEndSequence) {
		page[pageDepth] = 1;
		iteration[pageDepth - 1]++;
	}
	// We reached the end of an iteration, move up
	if (iteration[pageDepth - 1] > pager.maxIteration[pageDepth - 1]) {
		page.pop();
		iteration.pop();
		return getNextPager(
			{
				...pager,
				page,
				iteration,
			},
			options
		);
	}
	return {
		...pager,
		page,
		iteration,
	};
}

export function getPrevPager(
	pager: LunaticState['pager']
): LunaticState['pager'] {
	const pageDepth = pager.page.length - 1;
	const page = [...pager.page];
	const iteration = [...pager.iteration];
	page[pageDepth]--;

	// We reached the start of the questionnaire
	if (page.length === 1 && page[pageDepth] < 1) {
		return pager;
	}

	// We reached the start of the sequence, move up
	if (page[pageDepth] < 1) {
		page[pageDepth] = pager.maxPage[pageDepth];
		iteration[pageDepth - 1]--;
	}

	// We reached the start of an iteration, move up
	if (iteration[pageDepth - 1] < 0) {
		page.pop();
		iteration.pop();
		return getPrevPager({
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
