function getId() {
	return `lunatic-suggester-${new Date().getTime()}`;
}

function reduce(state, action) {
	const { payload } = action;
	const { id } = payload;
	return { ...state, id: id || getId() };
}

export default reduce;
