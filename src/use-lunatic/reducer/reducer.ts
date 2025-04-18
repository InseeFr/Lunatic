import { type Action, ActionKind } from '../actions';
import type { LunaticReducerState } from '../type';
import { reduceGoNextPage } from './reduce-go-next-page';
import { reduceHandleChanges } from './reduce-handle-changes';
import { reduceGoPreviousPage } from './reduce-go-previous-page';
import { reduceGoToPage } from './reduce-go-to-page';

// Actions that trigger a change in the store
const commitActions: ActionKind[] = [
	ActionKind.GO_PREVIOUS_PAGE,
	ActionKind.GO_NEXT_PAGE,
	ActionKind.GO_TO_PAGE,
];

export function reducer(
	state: LunaticReducerState,
	action: Action
): LunaticReducerState {
	if (commitActions.includes(action.type)) {
		state.variables.commit();
	}

	switch (action.type) {
		case ActionKind.GO_PREVIOUS_PAGE:
			return reduceGoPreviousPage(state);
		case ActionKind.GO_NEXT_PAGE:
			return reduceGoNextPage(state);
		case ActionKind.GO_TO_PAGE:
			return reduceGoToPage(state, action);
		case ActionKind.HANDLE_CHANGES:
			return reduceHandleChanges(state, action);
		default:
			return state;
	}
}
