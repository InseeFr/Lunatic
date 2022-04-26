function reduceOnDelete(state) {
	return {
		...state,
		search: '',
		selectedIndex: undefined,
		expended: false,
	};
}

export default reduceOnDelete;
