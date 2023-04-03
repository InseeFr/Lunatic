import { ComboAction, ComboActionKind } from './actions';
import reduceOnKeydown from './reduce-on-keydown/reduce-on-keydown';
import reduceOnInit from './reduce-on-init';
import { ComboBoxState } from './index';

export function reducer(
	state: ComboBoxState,
	action: ComboAction
): ComboBoxState {
	switch (action.type) {
		case ComboActionKind.ON_FOCUS:
			return { ...state, expanded: true, focused: true };
		case ComboActionKind.ON_BLUR:
			return { ...state, expanded: false, focused: false };
		case ComboActionKind.ON_CHANGE:
			return {
				...state,
				search: action.payload.search,
				selectedIndex: undefined,
			};
		case ComboActionKind.ON_SELECT:
			return {
				...state,
				selectedIndex: action.payload.selectedIndex,
				expanded: false,
			};
		case ComboActionKind.ON_DELETE:
			return {
				...state,
				search: '',
				selectedIndex: undefined,
				expanded: false,
			};
		case ComboActionKind.ON_KEYDOWN:
			return reduceOnKeydown(state, action);
		case ComboActionKind.ON_INIT:
			return reduceOnInit(state, action);
		default:
			return state;
	}
}
