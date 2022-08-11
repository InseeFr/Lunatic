import { isOnEmptyPage } from './commons';
import { createValidateReducer } from './validate-controls';
import reduceGoNextPage from './reduce-go-next-page';

function validateChange(state) {
	if (isOnEmptyPage(state)) {
		return reduceGoNextPage(state);
	}
	return state;
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
	return validateChange({
		...state,
		pager: {
			...pager,
			subPage: 0,
			nbSubPages: 1,
			iteration: 0,
			nbIterations: 0,
			page: newPage,
		},
	});
}

export default createValidateReducer(reduceGoToPage);
