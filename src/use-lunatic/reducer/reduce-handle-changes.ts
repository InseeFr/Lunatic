import type { LunaticReducerState } from '../type';
import { isNumber } from '../../utils/number';
import type { ActionHandleChanges } from '../actions';

/**
 * Update collected variables
 */
export function reduceHandleChanges(
	state: LunaticReducerState,
	action: ActionHandleChanges
): LunaticReducerState {
	const getIteration = (iteration?: number[]) => {
		// Resolve iteration from pager when it's not available in the payload
		if (!iteration && isNumber(state.pager.iteration)) {
			return [state.pager.iteration];
		}
		return iteration;
	};

	// Update all variables in the store
	for (const response of action.payload.responses) {
		state.updateBindings(response.name, response.value, {
			iteration: getIteration(response.iteration),
		});
	}

	return {
		...state,
		updatedAt: Date.now(),
	};
}
