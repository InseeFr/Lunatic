import {
	createControlsReducer,
	createModalControlsReducer,
} from './validate-controls';
import { LunaticState } from '../type';
import { isPageEmpty } from '../commons/page';
import { getNextPager } from './commons/page-navigation';
import { autoExploreLoop } from './commons/auto-explore-loop';

function reduceGoNextPage(state: LunaticState): LunaticState {
	const { pages, pager } = state;
	const nextPager = getNextPager(pager);
	const pageId = nextPager.page.join('.');
	let nextPage = pages[pageId];

	if (!nextPage) {
		throw new Error(`Cannot reach next page ${pageId}`);
	}

	// We are on a roundabout, and we are about to change iteration, go back to the roundabout
	const rootPage = pages[pager.page[0].toString()];
	const rootComponent = rootPage?.components[0];
	if (
		rootComponent?.componentType === 'Roundabout' &&
		pager.iteration[0] !== nextPager.iteration[0]
	) {
		nextPager.page = rootComponent.page.split('.').map((v) => parseInt(v, 10));
		nextPager.iteration = [];
		nextPager.maxIteration = [];
		nextPager.maxPage = nextPager.maxPage.slice(0, 1);
	}

	// We reached a loop, go inside
	const newState = autoExploreLoop({ ...state, pager: nextPager }, 'forward');

	// We reached an empty page, fast forward to the next
	if (isPageEmpty(newState)) {
		return reduceGoNextPage(newState);
	}

	return newState;
}

export default createModalControlsReducer(
	createControlsReducer(reduceGoNextPage)
);
