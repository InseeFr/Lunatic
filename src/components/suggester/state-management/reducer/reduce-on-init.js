function getId() {
	return `lunatic-suggester-${new Date().getTime()}`;
}

function reduce(state, action) {
	const { payload } = action;
	const { id, disabled } = payload;
	return { ...state, id: id || getId(), disabled };
}

export default reduce;
