import { reduceOnInit } from './reduce-on-init';
import reduceGoPreviousPage from './reduce-go-previous-page';
import reduceGoNextPage from './reduce-go-next-page';
import reduceGoToPage from './reduce-go-to-page';
import reduceHandleChange from './reduce-handle-change';
import reduceOnSetWaiting from './reduce-on-set-waiting';
import { LunaticState } from '../type';
import { Action, ActionKind } from '../actions';
import { reduceLastReachedPage } from './reduce-last-reached-page';

function reducer(state: LunaticState, action: Action): LunaticState {
	switch (action.type) {
		case ActionKind.ON_INIT:
			return reduceLastReachedPage(reduceOnInit(state, action));
		case ActionKind.GO_PREVIOUS_PAGE:
			return reduceGoPreviousPage(state);
		case ActionKind.GO_NEXT_PAGE:
			return reduceLastReachedPage(reduceGoNextPage(state, action));
		case ActionKind.GO_TO_PAGE:
			return reduceLastReachedPage(reduceGoToPage(state, action));
		case ActionKind.HANDLE_CHANGE:
			return reduceHandleChange(state, action);
		case ActionKind.ON_SET_WAITING:
			return reduceOnSetWaiting(state, action);
		default:
			return state;
	}
}

export default reducer;
