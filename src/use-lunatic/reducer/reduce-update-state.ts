import { ActionUpdateState } from '../actions';
import { LunaticState } from '../type';

export function reduceUpdateState(
	state: LunaticState,
	action: ActionUpdateState
) {
	const { payload } = action;
	const { getSuggesterStatus } = payload;
	if (getSuggesterStatus !== undefined) {
		return { ...state, getSuggesterStatus };
	}
	return state;
}
