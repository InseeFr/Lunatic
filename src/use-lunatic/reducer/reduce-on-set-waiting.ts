import { LunaticState } from '../type';
import { ActionKind, PayloadForAction } from '../actions';

function reduceOnSetWaiting(
	state: LunaticState,
	action: { payload: PayloadForAction<typeof ActionKind.ON_SET_WAITING> }
) {
	const { payload } = action;
	const { status } = payload;
	return { ...state, waiting: status };
}

export default reduceOnSetWaiting;
