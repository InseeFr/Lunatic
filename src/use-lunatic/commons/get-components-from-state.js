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
				return filterComponentsInPage(components);
			}
		} else {
			const { components } = current;
			return filterComponentsInPage(components);
		}
	}

	return [];
}

function filterComponentsInPage(components) {
	// Don't display FilterDescription if filterDescription is false
	return components.filter((c) =>
		c.componentType === 'FilterDescription' ? c.filterDescription : true
	);
}

export default getComponentsFromState;
