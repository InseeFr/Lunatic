import { isOnEmptyPage, getPageTag } from './commons';
import { createModalControlsReducer } from './validate-controls';
import reduceGoNextPage from './reduce-go-next-page';

function validateChange(state) {
	const { pager, errors } = state;
	const currentErrors =
		errors !== undefined ? errors[getPageTag(pager)] : undefined;
	const updatedState = { ...state, currentErrors };
	if (isOnEmptyPage(updatedState)) {
		return reduceGoNextPage(updatedState);
	}
	return updatedState;
}

function resolveSubPage(state, payload) {
	const { pager, pages } = state;
	const { page, iteration, nbIterations, subPage = 0 } = payload;

	const { subPages } = pages[page] || { subPage: [] };
	const nbSubPages = subPages.length;

	return {
		...state,
		isInLoop: true,
		pager: { ...pager, page, iteration, nbIterations, nbSubPages, subPage },
	};
}

function reduceGoToPage(state, action) {
	const { isInLoop, pager } = state;
	const { payload } = action;
	const { page: newPage, iteration } = payload;

	if (iteration !== undefined) {
		return resolveSubPage(state, payload);
	}
	if (!isInLoop)
		return {
			...state,
			pager: {
				...pager,
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
				page: newPage,
			},
		};
	// TODO: fix when redirect to loop component
	// How to calculate nbSubPages & nbIterations? everything is in the state
	// How to calculate lazy variables we need?
	// Handle setLoopBindings with the good iteration
	return validateChange(state);
}

export default createModalControlsReducer(reduceGoToPage);
