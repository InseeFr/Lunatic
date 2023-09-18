import { type Action, ActionKind } from '../actions';
import type { LunaticState } from '../type';
import reduceGoNextPage from './reduce-go-next-page';
import reduceGoPreviousPage from './reduce-go-previous-page';
import reduceGoToPage from './reduce-go-to-page';
import reduceHandleChange from './reduce-handle-change';
import reduceOnInit from './reduce-on-init';
import reduceOnSetWaiting from './reduce-on-set-waiting';
import { reduceUpdateState } from './reduce-update-state';

function reducer(state: LunaticState, action: Action): LunaticState {
	switch (action.type) {
		case ActionKind.ON_INIT:
			return reduceOnInit(state, action);
		case ActionKind.GO_PREVIOUS_PAGE:
			return reduceGoPreviousPage(state);
		case ActionKind.GO_NEXT_PAGE:
			return reduceGoNextPage(state, action);
		case ActionKind.GO_TO_PAGE:
			return reduceGoToPage(state, action);
		case ActionKind.HANDLE_CHANGE:
			return reduceHandleChange(state, action);
		case ActionKind.ON_SET_WAITING:
			return reduceOnSetWaiting(state, action);
		case ActionKind.UPDATE_STATE:
			return reduceUpdateState(state, action);
		default:
			return state;
	}
}

export default reducer;
