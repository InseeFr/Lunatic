import { getNewReachedPage } from '../commons';
import { getPageId, isPageEmpty } from '../commons/page';
import { getNextPager } from '../commons/page-navigation';
import type { LunaticReducerState } from '../type';
import { autoExploreLoop } from './commons/auto-explore-loop';
import { reduceHandleChanges } from './reduce-handle-changes';
import { ActionKind } from '../actions';

export function reduceGoNextPage(
	state: LunaticReducerState
): LunaticReducerState {
	const { pages, pager } = state;
	const parentType = pages[pager.page]?.components[0].componentType;
	const nextPager = getNextPager(pager, parentType);
	const pageId = getPageId(nextPager);

	if (!pages[pageId]) {
		throw new Error(`Cannot reach next page ${pageId}`);
	}

	let newState = { ...state, pager: nextPager };

	// We reached an empty page, move forward
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	// If we reached a loop, go inside
	newState = autoExploreLoop(newState, 'forward');

	// We explored a loop, check if we reached an empty page, move forward
	if (newState.pager !== nextPager && isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	// We moved up, and we are on a roundabout, update the progress variable
	if (
		// We moved up
		newState.pager.page === newState.previousPager.page &&
		newState.pager.subPage === undefined &&
		newState.previousPager.iteration !== undefined &&
		// We are on a roundabout
		newState.pages[newState.pager.page].components.length > 0
	) {
		// Split the condition to infer variable type
		const firstComponent = newState.pages[newState.pager.page].components[0];
		if (firstComponent.componentType === 'Roundabout') {
			newState = reduceHandleChanges(newState, {
				type: ActionKind.HANDLE_CHANGES,
				payload: {
					responses: [
						{
							name: firstComponent.progressVariable,
							value: 1,
							iteration: [newState.previousPager.iteration],
						},
					],
				},
			});
		}
	}

	return {
		...newState,
		isInLoop: newState.pager.iteration !== undefined,
		previousPager: state.pager,
		pager: {
			...newState.pager,
			lastReachedPage: getNewReachedPage(newState.pager),
		},
	};
}
