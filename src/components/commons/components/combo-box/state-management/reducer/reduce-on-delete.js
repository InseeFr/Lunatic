function reduceOnDelete(state) {
	return { ...state, search: '', selectedIndex: undefined };
}

export default reduceOnDelete;
