import getComponentValue from './get-component-value';

function fillComponentValue(component, variables) {
	const value = getComponentValue(component, variables);
	return { ...component, value };
}

function fillComponentsValue(components, variables) {
	return components.map(function (component) {
		return fillComponentValue(component, variables);
	});
}

function getComponentsFromState(state) {
	const { pager, pages, isInLoop, variables } = state;
	const { page, subPage } = pager;

	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop) {
			const { subPages } = current;
			const stepName = subPages[subPage];
			if (stepName in pages) {
				const currentSubPage = pages[stepName];
				const { components } = currentSubPage;
				return fillComponentsValue(components, variables);
			}
		} else {
			const { components } = current;
			return fillComponentsValue(components, variables);
		}
	}

	return [];
}

export default getComponentsFromState;
