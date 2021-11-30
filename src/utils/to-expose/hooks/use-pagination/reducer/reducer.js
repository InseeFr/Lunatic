import * as actions from '../actions';
import reduceGoNext from './reduce-go-next';

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.GO_NEXT:
			return reduceGoNext(state);
		default:
			return state;
	}
}

export default reducer;
