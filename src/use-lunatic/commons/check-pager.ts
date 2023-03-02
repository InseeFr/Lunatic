import { LunaticState } from '../type';

/**
 * Reset the pager at his initial state
 */
export default function clearPager(
	pager: LunaticState['pager']
): LunaticState['pager'] {
	const { maxPage, lastReachedPage } = pager;
	return {
		maxPage,
		lastReachedPage,
		page: [1],
		iteration: [],
		shallowIteration: undefined,
		maxIteration: [],
	};
}
