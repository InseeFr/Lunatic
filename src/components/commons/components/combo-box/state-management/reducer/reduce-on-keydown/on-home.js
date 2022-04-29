function onHome(state, nbOptions) {
	if (nbOptions) {
		return {
			...state,
			selectedIndex: 0,
			expended: true,
		};
	}

	return { ...state, expended: true };
}

export default onHome;
