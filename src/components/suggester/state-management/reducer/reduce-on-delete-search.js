function reduce(state) {
	return {
		...state,
		search: '',
		selectedIndex: undefined,
		options: [],
		expanded: false,
	};
}

export default reduce;
