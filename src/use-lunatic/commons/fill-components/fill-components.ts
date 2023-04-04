import { LunaticComponentDefinition, LunaticState } from '../../type';
import fillComponentExpressions, {
	DeepTranslateExpression,
} from './fill-component-expressions';
import fillComponentValue, {
	FilledProps as FilledValueProps,
} from './fill-component-value';
import fillFromState, {
	FilledProps as FilledHandlersProps,
} from './fill-from-state';
import fillManagement, {
	FilledProps as FilledManagementProps,
} from './fill-management';
import fillMissingResponse, {
	FilledProps as FilledMissingResponseProps,
} from './fill-missing-response';
import fillPagination, {
	FilledProps as FilledPaginationProps,
} from './fill-pagination';
import fillSpecificExpressions from './fill-specific-expression';

export type LunaticComponentProps<
	T = LunaticComponentDefinition['componentType']
> = DeepTranslateExpression<LunaticComponentDefinition & { componentType: T }> &
	FilledManagementProps &
	FilledValueProps &
	FilledMissingResponseProps &
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
	fillFromState,
	fillComponentExpressions,
	fillSpecificExpressions,
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
): LunaticComponentProps[] {
	return components.map(function (component) {
		return fillComponent(component, state);
	});
}

export default fillComponents;
