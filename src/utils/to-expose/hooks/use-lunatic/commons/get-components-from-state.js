import getComponentValue from './get-component-value';

function fillComponentValue(component, state) {
	const value = getComponentValue(component, state);
	return { ...component, value };
}

function fillPagination(component, state) {
	const { pager } = state;
	const { iteration } = pager;

	return { ...component, iteration };
}

function fillComponents(components, state) {
	return components.map(function (component) {
		return fillPagination(fillComponentValue(component, state), state);
	});
}

function getComponentsFromState(state) {
	const { pager, pages, isInLoop, appendExpressions } = state;
	const { page, subPage } = pager;

	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop) {
			const { subPages } = current;
			const stepName = subPages[subPage];
			if (stepName in pages) {
				const currentSubPage = pages[stepName];
				const { components } = currentSubPage;
				appendExpressions(components, pager);
				return fillComponents(components, state);
			}
		} else {
			const { components } = current;
			appendExpressions(components, pager);
			return fillComponents(components, state);
		}
	}

	return [];
}

export default getComponentsFromState;
