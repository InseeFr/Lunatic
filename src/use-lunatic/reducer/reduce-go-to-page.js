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

function reduceGoToPage(state, action) {
	const { isInLoop, pager } = state;
	const {
		payload: { page: newPage },
	} = action;
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
	// How to calculate nbSubPages & nbIterations?
	// How to calculate lazy variables we need?
	return validateChange(state);
}

export default createModalControlsReducer(reduceGoToPage);
