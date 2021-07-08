function reduce(state) {
	return { ...state, focused: false, expended: false, displayLabel: true };
}

export default reduce;
