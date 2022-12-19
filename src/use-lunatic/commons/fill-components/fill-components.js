import fillComponentExpressions from './fill-component-expressions';
import fillErrors from './fill-errors';
import fillFromState from './fill-from-state';
import fillComponentValue from './fill-component-value';
import fillPagination from './fill-pagination';
import fillMissingResponse from './fill-missing-response';
import fillManagement from './fill-management';
import fillSpecificExpressions from './fill-specific-expressions';

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
	fillSpecificExpressions,
	fillPagination,
	fillComponentValue,
	fillMissingResponse,
	fillManagement
);

function fillComponents(components, state) {
	return components.map(function (component) {
		return fillComponent(component, state);
	});
}

export default fillComponents;
