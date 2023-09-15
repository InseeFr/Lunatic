import { KEYBOARD_KEY_CODES } from './keyboard-key-codes';
import { onArrowDown } from './on-arrow-down';
import { onArrowUp } from './on-arrow-up';
import { onTab } from './on-tab';
import { onHome } from './on-home';
import { onEnd } from './on-end';
import { onEnter } from './on-enter';
import { onEscape } from './on-escape';
import { type ComboBoxState } from '../index';
import { type ComboAction, ComboActionKind } from '../actions';

export function reduceOnKeyDown(
	state: ComboBoxState,
	action: ComboAction<ComboActionKind.ON_KEYDOWN>
) {
	const { payload } = action;
	const { key, nbOptions } = payload;

	switch (key) {
		case KEYBOARD_KEY_CODES.Tab:
			return onTab(state);
		case KEYBOARD_KEY_CODES.ArrowDown:
			return onArrowDown(state, nbOptions);
		case KEYBOARD_KEY_CODES.ArrowUp:
			return onArrowUp(state, nbOptions);
		case KEYBOARD_KEY_CODES.Home:
			return onHome(state, nbOptions);
		case KEYBOARD_KEY_CODES.End:
			return onEnd(state, nbOptions);
		case KEYBOARD_KEY_CODES.Enter:
			return onEnter(state);
		case KEYBOARD_KEY_CODES.Escape:
			return onEscape(state);
		default:
			return state;
	}
}

export default reduceOnKeyDown;
