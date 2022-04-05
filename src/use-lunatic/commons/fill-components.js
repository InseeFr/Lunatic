import getComponentValue from './get-component-value';
import fillComponentExpressions from './fill-component-expressions';
import fillErrors from './fill-errors';

function fillComponentComportements(component, state) {
	const { handleChange, executeExpression, preferences } = state;
	return { ...component, handleChange, executeExpression, preferences };
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

		return fillErrors(
			fillComponentComportements(
				fillComponentExpressions(
					fillPagination(fillComponentValue(component, state), state),
					{
						executeExpression,
						iteration,
					}
				),
				state
			),
			state
		);
	});
}

export default fillComponents;
