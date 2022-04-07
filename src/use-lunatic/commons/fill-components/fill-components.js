import fillComponentExpressions from './fill-component-expressions';
import fillErrors from './fill-errors';
import fillFromState from './fill-from-state';
import fillComponentValue from './fill-component-value';
import fillPagination from './fill-pagination';

function compose(...fill) {
	return fill.reduce(
		function (a, b) {
			return (cmp, state) => b(a(cmp, state), state);
		},
		(c) => c
	);
}

const fillComponent = compose(
	fillErrors,
	fillFromState,
	fillComponentExpressions,
	fillPagination,
	fillComponentValue
);

function fillComponents(components, state) {
	return components.map(function (component) {
		return fillComponent(component, state);
	});
}

export default fillComponents;
