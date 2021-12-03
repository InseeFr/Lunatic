import reduceOnInit from './reduce-on-init';
import reduceGoNextPage from './reduce-go-next-page';
import reduceGoPreviousPage from './reduce-go-previous-page';
import reduceHandleChange from './reduce-handle-change';
import * as actions from '../actions';

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_INIT:
			return reduceOnInit(state, action);
		case actions.GO_NEXT_PAGE:
			return reduceGoNextPage(state, action);
		case actions.GO_PREVIOUS_PAGE:
			return reduceGoPreviousPage(state, action);
		case actions.HANDLE_CHANGE:
			return reduceHandleChange(state, action);
		default:
			return state;
	}
}

export default reducer;
