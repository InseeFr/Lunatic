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
import { computeOptionsFromComponent } from '../../props/propOptions';
import { LunaticLogger } from '../../logger/type';
import { VTLScalarExpression } from '../../../type.source';

export type FillComponentArgs = {
	disableFilters?: boolean;
	disableFiltersDescription?: true;
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
	logger: LunaticLogger;
};

/**
 * To make this work with TypeScript we need to call function in succession, we prefer expressiveness here over generalized approach
 */
export const fillComponent = (
	component: LunaticComponentDefinition,
	state: FillComponentArgs,
	// the given parentConditionFilter is typed as VTLScalarExpression, but it's actually a boolean or undefined
	parentConditionFilter?: any,
	// the given parentReadonly is typed as VTLScalarExpression, but it's actually a boolean or undefined
	parentReadOnly?: any
): LunaticComponentProps & { conditionFilter?: boolean } => {
	const interpretedProps = fillComponentExpressions(component, state);

	const shouldParentBeFiltered = parentConditionFilter === false;

	const isParentReadOnly = parentReadOnly === true;

	// if a parent component is readOnly, then the children also are
	const readOnly =
		isParentReadOnly ||
		('conditionReadOnly' in interpretedProps
			? interpretedProps.conditionReadOnly
			: false);

	// if a parent component is filtered, then the children also are
	const shouldBeFiltered =
		shouldParentBeFiltered ||
		('conditionFilter' in interpretedProps
			? !interpretedProps.conditionFilter
			: false);

	const value = getValueProp(component, state);
	return {
		...interpretedProps,
		handleChanges: state.handleChanges,
		executeExpression: state.executeExpression,
		preferences: state.preferences,
		goToPage: state.goToPage,
		shortcut: state.shortcut,
		goNextPage: state.goNextPage,
		goPreviousPage: state.goPreviousPage,
		readOnly: readOnly,
		shouldBeFiltered: shouldBeFiltered,
		iteration: state.pager.iteration,
		required: 'isMandatory' in component ? component.isMandatory : false,
		value: value,
		missingResponse: getMissingResponseProp(component, state),
		management: state.management,
		iterations: getIterationsProp(component, state),
		options: computeOptionsFromComponent(interpretedProps, {
			variables: state.variables,
			handleChanges: state.handleChanges,
			pagerIteration: state.pager.iteration,
			value,
			logger: state.logger,
			disableFilters: state.disableFilters,
			shouldParentBeFiltered: shouldBeFiltered,
		}),
		...getComponentTypeProps(interpretedProps, state),
		// This is too dynamic to be typed correctly, so we allow any here
	} as any;
};

/**
 * Fill components with values coming from the state, and interpret VTL expression
 */
export function fillComponents(
	components: LunaticComponentDefinition[],
	state: FillComponentArgs,
	parentType?: LunaticComponentDefinition['componentType'],
	parentConditionFilter?: VTLScalarExpression,
	parentReadOnly?: VTLScalarExpression
): LunaticComponentProps[] {
	// Flatmap to directly remove FilterDescription components if disableFiltersDescription is true
	const filledComponents = components.flatMap((component) => {
		if (
			component.componentType === 'FilterDescription' &&
			state.disableFiltersDescription
		) {
			return [];
		}

		return [
			fillComponent(component, state, parentConditionFilter, parentReadOnly),
		];
	});

	if (state.disableFilters) {
		return filledComponents;
	}

	// For rosterForLoop we want empty cell when the component is filtered
	if (parentType === 'RosterForLoop') {
		return filledComponents.map((filledComponent) =>
			(filledComponent.conditionFilter ?? true)
				? filledComponent
				: // Replace the component by an empty text component
					({
						...filledComponent,
						label: '',
						componentType: 'Text',
					} as LunaticComponentProps)
		);
	}

	// Remove filtered component (conditionFilter must be true to keep a component)
	return filledComponents.filter(
		({ conditionFilter }) => conditionFilter ?? true
	);
}
