import * as actions from '../actions';
import reduceOnInit from './reduce-on-init';
import reducegoNext from './reduce-go-next';
import reducegoPrevious from './reduce-go-previous';

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_INIT:
			return reduceOnInit(state, action);
		case actions.GO_NEXT:
			return reducegoNext(state, action);
		case actions.GO_PREVIOUS:
			return reducegoPrevious(state, action);

		default:
			return state;
	}
}

export default reducer;
