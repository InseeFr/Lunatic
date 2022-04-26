function reduceOnBlur(state) {
	return { ...state, expended: false, focused: false };
}

export default reduceOnBlur;
