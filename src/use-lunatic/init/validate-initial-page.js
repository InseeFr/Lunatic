function validateInitialPage(state, initialTag) {
	const { pager, pages = {} } = state;

	if (pages) {
		let { first: pageTag } = pages;
		if (initialTag in pages) {
			pageTag = initialTag;
		}
		if (pageTag) {
			const isFirst = pageTag === pages.first;
			const isLast = pageTag === pages.last;

			return { ...state, pager: { ...pager, pageTag, isFirst, isLast } };
		}
	}
	return state;
}

export default validateInitialPage;
