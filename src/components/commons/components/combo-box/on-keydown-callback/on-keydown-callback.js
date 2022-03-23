import KEYBOARD_KEY_CODES from './keyboard-key-codes';
import onArrowDown from './on-arrow-down';
import onArrowUp from './on-arrow-up';
import onTab from './on-tab';
import onHome from './on-home';
import onEnd from './on-end';
import onEnter from './on-enter';
import onEscape from './on-escape';

function onKeyDownCallback(e, args) {
	const { key } = e;
	switch (key) {
		case KEYBOARD_KEY_CODES.Tab:
			return onTab(e, args);
		case KEYBOARD_KEY_CODES.ArrowDown:
			return onArrowDown(e, args);
		case KEYBOARD_KEY_CODES.ArrowUp:
			return onArrowUp(e, args);
		case KEYBOARD_KEY_CODES.Home:
			return onHome(e, args);
		case KEYBOARD_KEY_CODES.End:
			return onEnd(e, args);
		case KEYBOARD_KEY_CODES.Enter:
			return onEnter(e, args);
		case KEYBOARD_KEY_CODES.Escape:
			return onEscape(e, args);
		default:
			return args;
	}
}

export default onKeyDownCallback;
