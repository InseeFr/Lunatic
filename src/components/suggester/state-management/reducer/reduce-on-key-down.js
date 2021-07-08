import { BINDED_KEYS } from '../../commons-tools';

function reduceArrowDown(state) {
	const { options, selectedIndex: prec } = state;
	if (options.length) {
		const selectedIndex = Math.min(prec + 1 || 0, options.length - 1);
		return { ...state, selectedIndex, expended: true, displayLabel: true };
	}
	return state;
}

function reduceArrowUp(state) {
	const { selectedIndex: prec, options } = state;
	if (options.length) {
		const selectedIndex = Math.max(prec - 1 || 0, 0);
		return { ...state, selectedIndex, expended: true, displayLabel: true };
	}
	return state;
}

function reduceHome(state) {
	const { options } = state;
	if (options.length) {
		return { ...state, selectedIndex: 0, expended: true };
	}
	return state;
}

function reduceEnd(state) {
	const { options } = state;
	if (options.length) {
		return { ...state, selectedIndex: options.length - 1, expended: true };
	}
	return state;
}

function reduceTab(state) {
	return { ...state, focused: false, expended: false };
}

function reduceEnter(state) {
	const { expended } = state;
	return { ...state, expended: !expended };
}

function reduceEscape(state) {
	return { ...state, expended: false };
}

function reduce(state, action) {
	const { payload } = action;
	const { key } = payload;
	switch (key) {
		case BINDED_KEYS.ArrowDown:
			return reduceArrowDown(state);
		case BINDED_KEYS.ArrowUp:
			return reduceArrowUp(state);
		case BINDED_KEYS.Home:
			return reduceHome(state);
		case BINDED_KEYS.End:
			return reduceEnd(state);
		case BINDED_KEYS.Tab:
			return reduceTab(state);
		case BINDED_KEYS.Enter:
			return reduceEnter(state);
		case BINDED_KEYS.Escape:
			return reduceEscape(state);
		default:
			return state;
	}
}

export default reduce;
