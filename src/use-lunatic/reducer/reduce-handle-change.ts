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
	let iteration = action.payload.iteration;
	// Resolve iteration from pager for loops
	if (!iteration && isNumber(state.pager.iteration)) {
		iteration = [state.pager.iteration];
	}
	state.updateBindings(action.payload.name, action.payload.value, {
		iteration,
	});

	return {
		...state,
		updatedAt: Date.now(),
	};
}
