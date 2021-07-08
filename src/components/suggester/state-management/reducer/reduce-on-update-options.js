function reduce(state, action) {
	const { payload } = action;
	const { options, search: old } = payload;
	const { search } = state;
	if (search === old) {
		return { ...state, options };
	}
	return { ...state, options: [] };
}

export default reduce;
