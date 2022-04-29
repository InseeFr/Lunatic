function onEnd(state, nbOptions) {
	if (nbOptions) {
		return {
			...state,
			selectedIndex: nbOptions - 1,
			expended: true,
		};
	}

	return { ...state, expended: true };
}

export default onEnd;
