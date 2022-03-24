function reduceOnFocus(state) {
	return { ...state, expended: true, focused: true };
}

export default reduceOnFocus;
