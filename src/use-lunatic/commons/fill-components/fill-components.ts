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

export type FilledLunaticComponentProps<
	T = LunaticComponentDefinition['componentType']
> = DeepTranslateExpression<LunaticComponentDefinition & { componentType: T }> &
	FilledManagementProps &
	FilledValueProps &
	FilledMissingResponseProps &
	FilledHandlersProps &
	FilledPaginationProps & {
		conditionFilter?: boolean;
	};

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
	fillPagination,
	fillComponentValue,
	fillMissingResponse,
	fillManagement,
	fillSpecificExpressions
) as (
	component: LunaticComponentDefinition,
	state: LunaticState
) => FilledLunaticComponentProps;

/**
 * Fill components with values coming from the state, and interpret VTL expression
 */
function fillComponents(
	components: LunaticComponentDefinition[],
	state: LunaticState
): FilledLunaticComponentProps[] {
	return components
		.map((component) => fillComponent(component, state))
		.filter(matchConditionFilter) as FilledLunaticComponentProps[];
}

function matchConditionFilter({
	conditionFilter,
}: {
	conditionFilter?: boolean;
}): boolean {
	return conditionFilter !== undefined ? conditionFilter : true;
}

export default fillComponents;
