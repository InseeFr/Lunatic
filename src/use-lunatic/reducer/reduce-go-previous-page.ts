import { LunaticState } from '../type';
import { getPrevPager } from '../commons/page-navigation';
import { autoExploreLoop } from './commons/auto-explore-loop';
import { getPageId, isPageEmpty } from '../commons/page';
import { getComponentsFromState } from '../commons';

function reduceGoPreviousPage(state: LunaticState): LunaticState {
	const { pages, pager } = state;
	const parentType = pages[pager.page]?.components[0].componentType;
	const prevPager = getPrevPager(pager, parentType);
	const pageId = getPageId(prevPager);
	let prevPage = pages[pageId];

	if (!prevPage) {
		throw new Error(`Cannot reach previous page ${pageId}`);
	}

	let newState = { ...state, pager: prevPager };

	// We reached an empty page, keep going backward
	if (isPageEmpty(newState)) {
		return reduceGoPreviousPage(newState);
	}

	// If we reached a loop, go to the last iteration / sequence
	newState = autoExploreLoop(newState, 'backward');

	// We explored a loop, check if we reached an empty page, move forward
	if (newState.pager !== prevPager && isPageEmpty(newState)) {
		return reduceGoPreviousPage(newState);
	}

	// We have a roundabout with only one iteration skip it
	const components = getComponentsFromState(newState);
	if (
		components.length === 1 &&
		components[0]?.componentType === 'Roundabout' &&
		newState.executeExpression<number>(components[0].iterations) === 1
	) {
		return reduceGoPreviousPage(newState);
	}

	return {
		...newState,
		isInLoop: newState.pager.iteration !== undefined,
	};
}

export default reduceGoPreviousPage;
