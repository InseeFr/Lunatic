import { type ActionHandleChange } from '../actions';
import type { LunaticState } from '../type';
import { isNumber } from '../../utils/number';

/**
 * Update collected variables
 */
export function reduceHandleChange(
	state: LunaticState,
	action: ActionHandleChange
): LunaticState {
	state.updateBindings(action.payload.name, action.payload.value, {
		iteration: action.payload.iteration,
	});

	return {
		...state,
		updatedAt: Date.now(),
	};
}
