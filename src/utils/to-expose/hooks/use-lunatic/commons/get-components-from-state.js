import getComponentValue from './get-component-value';

function fillComponentValue(component, state) {
	const value = getComponentValue(component, state);
	return { ...component, value };
}

function fillComponentsValue(components, state) {
	return components.map(function (component) {
		return fillComponentValue(component, state);
	});
}

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

				return fillComponentsValue(components, state);
			}
		} else {
			const { components } = current;
			return fillComponentsValue(components, state);
		}
	}

	return [];
}

export default getComponentsFromState;
