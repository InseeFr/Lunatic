import * as actions from '../actions';
import reduceOnInit from './reduce-on-init';

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_INIT:
			return reduceOnInit(state, action);

		default:
			return state;
	}
}

export default reducer;
