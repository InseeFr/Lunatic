import fillErrors, { FilledProps as FilledErrorsProps } from './fill-errors';
import fillFromState, {
	FilledProps as FilledHandlersProps,
} from './fill-from-state';
import fillComponentValue, {
	FilledProps as FilledValueProps,
} from './fill-component-value';
import fillPagination, {
	FilledProps as FilledPaginationProps,
} from './fill-pagination';
import fillMissingResponse, {
	FilledProps as FilledMissingResponseProps,
} from './fill-missing-response';
import fillManagement, {
	FilledProps as FilledManagementProps,
} from './fill-management';
import { LunaticComponentDefinition, LunaticState } from '../../type';
import fillComponentExpressions, {
	DeepTranslateExpression,
} from './fill-component-expressions';

type LunaticComponentProps =
	DeepTranslateExpression<LunaticComponentDefinition> &
		FilledManagementProps &
		FilledValueProps &
		FilledMissingResponseProps &
		FilledErrorsProps &
		FilledHandlersProps &
		FilledPaginationProps;

/**
 * Compose multiple methods together to create a new method
 *
 * This function is too dynamic for typescript, allow any
 */
function compose(...fill: Function[]) {
	return fill.reduce(
		function (a: any, b: any) {
			return (cmp: LunaticComponentDefinition, state: LunaticState) =>
				b(a(cmp, state), state);
		},
		(c: any) => c
	);
}

/**
 * Fill component with elements from the state
 *
 * Force typing for this function since it's doo dynamic
 */
const fillComponent = compose(
	fillErrors,
	fillFromState,
	fillComponentExpressions,
	fillPagination,
	fillComponentValue,
	fillMissingResponse,
	fillManagement
) as (
	component: LunaticComponentDefinition,
	state: LunaticState
) => LunaticComponentProps;

function fillComponents(
	components: LunaticComponentDefinition[],
	state: LunaticState
) {
	return components.map(function (component) {
		return fillComponent(component, state);
	});
}

export default fillComponents;
