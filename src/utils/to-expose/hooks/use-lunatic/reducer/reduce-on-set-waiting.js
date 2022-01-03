function reduceOnSetWaiting(state, action) {
	const { payload } = action;
	const { status } = payload;
	return { ...state, waiting: status };
}

export default reduceOnSetWaiting;
