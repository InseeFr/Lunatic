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
	state.updateBindings(action.payload.response.name, action.payload.value, {
		iteration: isNumber(state.pager.iteration)
			? [state.pager.iteration]
			: undefined,
	});

	return {
		...state,
		updatedAt: Date.now(),
	};
}
