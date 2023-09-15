import type { LunaticComponentDefinition, LunaticState } from '../../type';
import fillComponentExpressions, {
	type DeepTranslateExpression,
} from './fill-component-expressions';
import fillComponentValue, {
	type FilledProps as FilledValueProps,
} from './fill-component-value';
import fillFromState, {
	type FilledProps as FilledHandlersProps,
} from './fill-from-state';
import fillManagement, {
	type FilledProps as FilledManagementProps,
} from './fill-management';
import fillMissingResponse, {
	type FilledProps as FilledMissingResponseProps,
} from './fill-missing-response';
import fillPagination, {
	type FilledProps as FilledPaginationProps,
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
