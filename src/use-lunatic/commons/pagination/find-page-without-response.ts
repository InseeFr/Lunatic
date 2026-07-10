import type { LunaticReducerState, PageTag } from '../../type';
import { getComponentsFromState } from '../get-components-from-state';
import { getNextPager } from './page-navigation';
import { isPageEmpty } from './page';
import { getPageTag } from './page-tag';
import { autoExploreLoop } from '../../reducer/commons/auto-explore-loop';
import {
	fillComponents,
	type FillComponentArgs,
} from '../fill-components/fill-components';
import { hasOneResponse } from '../../hooks/use-page-has-response';

/**
 * Move the pager forward to the next page, skipping empty pages and entering loops.
 *
 * This mirrors the navigation logic of `reduceGoNextPage`, but stays pure: it never
 * mutates variables, since it's only used to preview upcoming pages without actually navigating.
 *
 * Returns the exact same `state` reference when there is no further page.
 */
function getNextPagerState(state: LunaticReducerState): LunaticReducerState {
	const { pages, pager } = state;
	const parentType = pages[pager.page]?.components[0]?.componentType;
	const nextPager = getNextPager(pager, parentType);

	if (nextPager === pager) {
		return state;
	}

	let newState = { ...state, pager: nextPager };

	if (isPageEmpty(newState)) {
		return getNextPagerState(newState);
	}

	newState = autoExploreLoop(newState, 'forward');

	if (newState.pager !== nextPager && isPageEmpty(newState)) {
		return getNextPagerState(newState);
	}

	return newState;
}

/**
 * Starting from the current page (included), find the first page that doesn't have any
 * response yet, and return its page tag.
 *
 * Returns `undefined` if every page, from the current one to the end of the survey,
 * already has a response.
 */
export function findFirstPageWithoutResponse(
	state: LunaticReducerState,
	fillArgs: Omit<FillComponentArgs, 'pager' | 'variables' | 'executeExpression'>
): PageTag | undefined {
	let current = state;

	while (true) {
		const components = fillComponents(getComponentsFromState(current), {
			...fillArgs,
			pager: current.pager,
			variables: current.variables,
			executeExpression: current.executeExpression,
		});

		if (!hasOneResponse(components, current.executeExpression)) {
			const pageTag = getPageTag(current.pager);
			return pageTag;
		}

		const next = getNextPagerState(current);
		if (next.pager === current.pager) {
			return undefined;
		}
		current = next;
	}
}
