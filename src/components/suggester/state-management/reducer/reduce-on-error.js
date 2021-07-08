function reduce(state, action) {
	const { payload } = action;
	const { message } = payload;

	return { ...state, messageError: message };
}

export default reduce;
