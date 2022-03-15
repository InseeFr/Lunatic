import getComponentValue from './get-component-value';
import fillComponentExpressions from './fill-component-expressions';

function fillComponentComportements(component, state) {
	const { handleChange, executeExpression } = state;
	return { ...component, handleChange, executeExpression };
}

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
		const { pager, executeExpression } = state;
		const { iteration } = pager;

		return fillComponentComportements(
			fillComponentExpressions(
				fillPagination(fillComponentValue(component, state), state),
				{
					executeExpression,
					iteration,
				}
			),
			state
		);
	});
}

export default fillComponents;
