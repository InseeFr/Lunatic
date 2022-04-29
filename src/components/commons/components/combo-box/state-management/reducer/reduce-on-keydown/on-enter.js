function onEnter(state) {
	const { expended } = state;
	return { ...state, expended: !expended, focused: true };
}

export default onEnter;
