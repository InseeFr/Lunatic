function fillPagination(component, state) {
	const { pager } = state;
	const { iteration } = pager;

	return { ...component, iteration };
}

export default fillPagination;
