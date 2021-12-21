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

export default fillComponents;
