function reduce(state) {
	return { ...state, focused: true, expended: true, displayLabel: false };
}

export default reduce;
