function onEscape(state) {
	return { ...state, expended: false, focused: true };
}

export default onEscape;
