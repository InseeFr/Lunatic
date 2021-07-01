import * as actions from '../actions';
import reduceOnChangeSearch from './reduce-on-change-search';
import reduceOnUpdateOptions from './reduce-on-update-options';
import reduceOnFocus from './reduce-on-focus';
import reduceOnBlur from './reduce-on-blur';
import reduceOnClickOption from './reduce-on-click-option';
import reduceOnKeyDown from './reduce-on-key-down';
import reduceOnInit from './reduce-on-init';

function reduce(state, action) {
	const { type } = action;
	switch (type) {
		case actions.ON_CHANGE_SEARCH:
			return reduceOnChangeSearch(state, action);
		case actions.ON_UPDATE_OPTIONS:
			return reduceOnUpdateOptions(state, action);
		case actions.ON_FOCUS:
			return reduceOnFocus(state, action);
		case actions.ON_BLUR:
			return reduceOnBlur(state, action);
		case actions.ON_CLICK_OPTION:
			return reduceOnClickOption(state, action);
		case actions.ON_KEY_DOWN:
			return reduceOnKeyDown(state, action);
		case actions.ON_INIT:
			return reduceOnInit(state, action);
		default:
			return state;
	}
}

export default reduce;
