import { type ActionHandleChange } from '../actions';
import type { LunaticState } from '../type';

/**
 * Update collected variables
 */
export function reduceHandleChange(
	state: LunaticState,
	action: ActionHandleChange
): LunaticState {
	state.variables.set(action.payload.response.name, action.payload.value, {
		iteration: state.pager.iteration ?? undefined,
	});

	return {
		...state,
		updatedAt: Date.now(),
	};
}
