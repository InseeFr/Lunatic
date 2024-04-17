import type { LunaticReducerState } from '../type';

/**
 * Reset the pager at his initial state
 */
export default function clearPager(
	pager: LunaticReducerState['pager']
): LunaticReducerState['pager'] {
	const { maxPage, lastReachedPage } = pager;
	return {
		maxPage,
		lastReachedPage,
		page: 1,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		shallowIteration: undefined,
		nbIterations: undefined,
	};
}
