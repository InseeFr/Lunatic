function getStringValue(value) {
	if (value) {
		return `${value}`;
	}
	return '';
}

function getId() {
	return `lunatic-suggester-${new Date().getTime()}`;
}

function reduce(state, action) {
	const { payload } = action;
	const { id, disabled, value } = payload;
	const { search } = state;

	if (value && search.length === 0) {
		return {
			...state,
			id: id || getId(),
			disabled,
			search: getStringValue(value),
		};
	}

	return { ...state, id: id || getId(), disabled };
}

export default reduce;
