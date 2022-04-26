function onArrowDown(state, nbOptions) {
	if (nbOptions) {
		const { selectedIndex } = state;

		if (selectedIndex !== undefined) {
			return {
				...state,
				selectedIndex: Math.min(selectedIndex + 1, nbOptions - 1),
				expended: true,
			};
		}
		return {
			...state,
			selectedIndex: 0,
			expended: true,
		};
	}

	return { ...state, expended: true };
}

export default onArrowDown;
