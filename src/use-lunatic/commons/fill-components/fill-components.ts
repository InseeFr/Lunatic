import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
	LunaticOptions,
	LunaticReducerState,
	LunaticState,
} from '../../type';
import { fillComponentExpressions } from './fill-component-expressions';
import { getComponentTypeProps } from '../../props/getComponentTypeProps';
import type { LunaticComponentProps } from '../../../components/type';
import { getMissingResponseProp } from '../../props/propMissingResponse';
import { getValueProp } from '../../props/propValue';
import { getIterationsProp } from '../../props/propIterations';

type FillComponentArgs = {
	handleChanges: LunaticChangesHandler;
	executeExpression: LunaticReducerState['executeExpression'];
	goToPage: LunaticState['goToPage'];
	goNextPage: LunaticState['goNextPage'];
	goPreviousPage: LunaticState['goPreviousPage'];
	shortcut: LunaticOptions['shortcut'];
	management: LunaticOptions['management'];
	preferences: LunaticOptions['preferences'];
	pager: LunaticReducerState['pager'];
	variables: LunaticReducerState['variables'];
};

/**
 * To make this work with TypeScript we need to call function in succession, we prefer expressiveness here over generalized approache
 */
export const fillComponent = (
	component: LunaticComponentDefinition,
	state: FillComponentArgs
): LunaticComponentProps & { conditionFilter?: boolean } => {
	const interpretedProps = fillComponentExpressions(component, state);
	return {
		...interpretedProps,
		handleChanges: state.handleChanges,
		executeExpression: state.executeExpression,
		preferences: state.preferences,
		goToPage: state.goToPage,
		shortcut: state.shortcut,
		goNextPage: state.goNextPage,
		goPreviousPage: state.goPreviousPage,
		iteration: state.pager.iteration,
		required: component.mandatory,
		value: getValueProp(component, state),
		missingResponse: getMissingResponseProp(component, state),
		management: state.management,
		iterations: getIterationsProp(component, state),
		...getComponentTypeProps(interpretedProps, state),
		// This is too dynamic to be typed correctly, so we allow any here
	} as any;
};

/**
 * Fill components with values coming from the state, and interpret VTL expression
 */
export function fillComponents(
	components: LunaticComponentDefinition[],
	state: FillComponentArgs
): LunaticComponentProps[] {
	return components
		.map((component) => fillComponent(component, state))
		.filter(({ conditionFilter }) => conditionFilter ?? true);
}
