import reduceOnInit from './reduce-on-init';
import reduceGoPreviousPage from './reduce-go-previous-page';
import reduceGoNextPage from './reduce-go-next-page';
import reduceGoToPage from './reduce-go-to-page';
import reduceHandleChange from './reduce-handle-change';
import reduceOnSetWaiting from './reduce-on-set-waiting';
import reduceOnInitComponent from './reduce-on-init-component';
import * as actions from '../actions';

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_INIT:
			return reduceOnInit(state, action);
		case actions.GO_PREVIOUS_PAGE:
			return reduceGoPreviousPage(state, action);
		case actions.GO_NEXT_PAGE:
			return reduceGoNextPage(state, action);
		case actions.GO_TO_PAGE:
			return reduceGoToPage(state, action);
		case actions.HANDLE_CHANGE:
			return reduceHandleChange(state, action);
		case actions.ON_SET_WAITING:
			return reduceOnSetWaiting(state, action);
		case actions.ON_INIT_COMPONENT:
			return reduceOnInitComponent(state, action);
		default:
			return state;
	}
}

export default reducer;
