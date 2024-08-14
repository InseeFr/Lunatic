import type { LunaticReducerState } from '../type';
import type { LunaticComponentType } from '../../components/type';

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
	pager: LunaticReducerState['pager'],
	parent?: LunaticComponentType
): LunaticReducerState['pager'] {
	// Increment the page or subPage
	// eslint-disable-next-line prefer-const
	let [page, subPage] =
		pager.subPage !== undefined
			? [pager.page, pager.subPage + 1]
			: [pager.page + 1, undefined];
	let iteration = pager.iteration;

	// We reached the end of the questionnaire
	if (page > pager.maxPage) {
		return pager;
	}

	// We reached the end of the sequence
	const isEndSequence =
		subPage && pager.nbSubPages ? subPage >= pager.nbSubPages : false;
	const moveUpOnEnd =
		parent === 'Roundabout' && pager.nbIterations && pager.nbIterations > 1;
	// Move up at the end of a sequence (instead of going to the next Iteration)
	if (isEndSequence && moveUpOnEnd) {
		return {
			...pager,
			page: page,
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
				page: page,
				...resetIteration,
			},
			parent
		);
	}
	return {
		...pager,
		page: page,
		subPage,
		iteration,
	};
}

export function getPrevPager(
	pager: LunaticReducerState['pager'],
	parent?: LunaticComponentType
): LunaticReducerState['pager'] {
	// Decrement the page or subPage
	// eslint-disable-next-line prefer-const
	let [page, subPage] =
		pager.subPage !== undefined
			? [pager.page, pager.subPage - 1]
			: [pager.page - 1, undefined];
	let iteration = pager.iteration;
	const moveUpOnStart =
		parent === 'Roundabout' && pager.nbIterations && pager.nbIterations > 1;

	// We reached the start of the questionnaire
	if (page <= 0) {
		return pager;
	}

	// We reached the start of the sequence, move up
	if (subPage !== undefined && pager.nbSubPages !== undefined && subPage < 0) {
		// Move up at the start of an iteration (for roundabout)
		if (moveUpOnStart) {
			return {
				...pager,
				page: page,
				...resetIteration,
			};
		}
		subPage = pager.nbSubPages - 1;
		iteration = (iteration ?? 0) - 1;
	}

	const isStartSequence = iteration !== undefined && iteration < 0;

	// We reached the start of an iteration, keep going backward
	if (isStartSequence) {
		return getPrevPager(
			{
				...pager,
				page: page,
				...resetIteration,
			},
			parent
		);
	}

	return {
		...pager,
		page: page,
		subPage,
		iteration,
	};
}
