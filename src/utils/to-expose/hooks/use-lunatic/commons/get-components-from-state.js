function getComponentsFromState(state) {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;

	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop) {
			const { subPages } = current;
			const stepName = subPages[subPage];
			if (stepName in pages) {
				const currentSubPage = pages[stepName];
				const { components } = currentSubPage;
				return components;
			}
		} else {
			const { components } = current;
			return components;
		}
	}

	return [];
}

export default getComponentsFromState;
