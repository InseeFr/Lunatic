function reduceOnChange(state, action) {
	const { payload } = action;
	const { search } = payload;
	return { ...state, search, selectedIndex: undefined };
}

export default reduceOnChange;
