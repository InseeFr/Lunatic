function reduceOnSelect(state, action) {
	const { payload } = action;
	const { selectedIndex } = payload;

	return { ...state, selectedIndex, expended: false };
}

export default reduceOnSelect;
