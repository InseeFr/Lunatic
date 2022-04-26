function onArrowUp(state, nbOptions) {
	if (nbOptions) {
		const { selectedIndex } = state;

		if (selectedIndex !== undefined) {
			return {
				...state,
				selectedIndex: Math.max(selectedIndex - 1, 0),
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

export default onArrowUp;
