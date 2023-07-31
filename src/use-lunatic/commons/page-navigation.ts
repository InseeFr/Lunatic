import { LunaticState } from '../type';
import { LunaticComponentType } from '../../components/type';

const resetIteration = {
	subPage: undefined,
	nbSubPages: undefined,
	iteration: undefined,
	nbIterations: undefined,
};

/**
 * Increment the pager to reach the next page or iteration
 */
export function getNextPager(
	pager: LunaticState['pager'],
	parent?: LunaticComponentType
): LunaticState['pager'] {
	// Increment the page or subPage
	let [page, subPage] =
		pager.subPage !== undefined
			? [parseInt(pager.page, 10), pager.subPage + 1]
			: [parseInt(pager.page, 10) + 1, undefined];
	let iteration = pager.iteration;

	// We reached the end of the questionnaire
	if (page > parseInt(pager.maxPage, 10)) {
		return pager;
	}

	// We reached the end of the sequence
	const isEndSequence =
		subPage && pager.nbSubPages ? subPage >= pager.nbSubPages : false;
	const moveUpOnEnd = parent === 'Roundabout';
	// Move up at the end of a sequence (instead of going to the next Iteration)
	if (isEndSequence && moveUpOnEnd) {
		return {
			...pager,
			page: page.toString(),
			...resetIteration,
		};
	}
	// Move to the next parent page (for loops)
	if (isEndSequence && iteration !== undefined) {
		subPage = 0;
		iteration++;
	}
	// We reached the end of an iteration, move up
	if (
		iteration !== undefined &&
		pager.nbIterations &&
		iteration >= pager.nbIterations
	) {
		return getNextPager(
			{
				...pager,
				page: page.toString(),
				...resetIteration,
			},
			parent
		);
	}
	return {
		...pager,
		page: page.toString(),
		subPage,
		iteration,
	};
}

export function getPrevPager(
	pager: LunaticState['pager'],
	parent?: LunaticComponentType
): LunaticState['pager'] {
	// Decrement the page or subPage
	let [page, subPage] =
		pager.subPage !== undefined
			? [parseInt(pager.page, 10), pager.subPage - 1]
			: [parseInt(pager.page, 10) - 1, undefined];
	let iteration = pager.iteration;

	// We reached the start of the questionnaire
	if (page <= 0) {
		return pager;
	}

	// We reached the start of the sequence, move up
	if (subPage !== undefined && pager.nbSubPages !== undefined && subPage < 0) {
		subPage = pager.nbSubPages - 1;
		iteration = (iteration ?? 0) - 1;
	}

	const isStartSequence = iteration !== undefined && iteration < 0;
	const moveUpOnStart = parent === 'Roundabout';

	// Move up at the start of a sequence (for roundabout)
	if (isStartSequence && moveUpOnStart) {
		return {
			...pager,
			page: page.toString(),
			...resetIteration,
		};
	}

	// We reached the start of an iteration, keep going backward
	if (isStartSequence) {
		return getPrevPager(
			{
				...pager,
				page: page.toString(),
				...resetIteration,
			},
			parent
		);
	}

	return {
		...pager,
		page: page.toString(),
		subPage,
		iteration,
	};
}
