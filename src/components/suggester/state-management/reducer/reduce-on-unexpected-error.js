function reduce(state, action) {
	const { payload } = action;
	const { error } = payload;
	return { ...state, unexpectedError: error };
}

export default reduce;
