import * as actions from '../actions';
import reduceOnFocus from './reduce-on-focus';
import reduceOnBlur from './reduce-on-blur';
import reduceOnChange from './reduce-on-change';
import reduceOnSelect from './reduce-on-select';
import reduceOnDelete from './reduce-on-delete';
import reduceOnKeydown from './reduce-on-keydown';
import { reduceOnInit } from './reduce-on-init';

function reducer(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_FOCUS:
			return reduceOnFocus(state, action);
		case actions.ON_BLUR:
			return reduceOnBlur(state, action);
		case actions.ON_CHANGE:
			return reduceOnChange(state, action);
		case actions.ON_SELECT:
			return reduceOnSelect(state, action);
		case actions.ON_DELETE:
			return reduceOnDelete(state, action);
		case actions.ON_KEYDOWN:
			return reduceOnKeydown(state, action);
		case actions.ON_INIT:
			return reduceOnInit(state, action);
		default:
			return state;
	}
}

export default reducer;
