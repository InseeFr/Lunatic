import { replaceComponentSequence } from '../replace-component-sequence';
import type {
	LunaticComponentDefinition,
	LunaticControl,
	LunaticError,
	LunaticReducerState,
} from '../type';
import {
	fillComponentExpressions,
	type DeepTranslateExpression,
} from './fill-components/fill-component-expressions';
import { checkRoundaboutControl } from '../reducer/controls/check-roundabout-control';
import { checkBaseControl } from '../reducer/controls/check-base-control';
import { getComponentsFromState } from './get-components-from-state';

export type StateForControls = Pick<
	LunaticReducerState,
	'pager' | 'pages' | 'isInLoop' | 'executeExpression'
>;

type ComponentDefinition = LunaticComponentDefinition;
type InterpretedComponent = DeepTranslateExpression<LunaticComponentDefinition>;
type InterpretedLoopComponent = DeepTranslateExpression<
	ComponentDefinition & {
		componentType: 'Loop' | 'RosterForLoop';
	}
>;

const isLoopComponent = (
	component: InterpretedComponent
): component is InterpretedLoopComponent => {
	return ['Loop', 'RosterForLoop'].includes(component.componentType);
};

/**
 * Check if components of the current page have errors, and return a map of error (indexed by component ID)
 */
function checkComponents(
	state: StateForControls,
	components: InterpretedComponent[]
): Record<string, LunaticError[]> {
	let errors = {} as Record<string, LunaticError[]>;

	for (const component of components) {
		if (!('controls' in component) || !('id' in component)) {
			continue;
		}
		const { controls, id } = component;
		// The component has global level controls
		if (Array.isArray(controls)) {
			const componentErrors = checkControls(
				controls.filter((c) => c.type !== 'ROW'),
				state.executeExpression,
				state.pager
			);
			if (componentErrors.length > 0) {
				errors[id] = componentErrors;
			}
		}

		// For loop, inspect children
		if (isLoopComponent(component)) {
			const rowControls = component.controls?.filter((c) => c.type === 'ROW');
			if (rowControls?.length) {
				errors = checkComponentInLoop(
					state,
					{ ...component, controls: rowControls },
					errors
				);
			}
			for (const child of component.components) {
				errors = checkComponentInLoop(state, child, errors);
			}
		}
	}

	return errors;
}

function checkControls(
	controls: LunaticControl[],
	executeExpression: LunaticReducerState['executeExpression'],
	pager: LunaticReducerState['pager']
): LunaticError[] {
	return controls
		.map((control) => {
			switch (control.type) {
				case 'roundabout':
					return checkRoundaboutControl(control, executeExpression);
				default:
					return checkBaseControl(control, executeExpression, pager);
			}
		})
		.filter((error) => error !== undefined) as LunaticError[];
}

/**
 * Figure out the number of iterations of a component
 */
function computeIterations(
	component: InterpretedComponent | ComponentDefinition,
	executeExpression: LunaticReducerState['executeExpression']
): number {
	if (
		'iterations' in component &&
		component.iterations &&
		typeof component.iterations === 'object' &&
		'value' in component.iterations
	) {
		return executeExpression<number>(component.iterations);
	}
	if ('response' in component) {
		const value = executeExpression({
			type: 'VTL',
			value: component.response.name,
		});
		if (Array.isArray(value)) {
			return value.length;
		}
	}
	// Look for the component with the biggest size
	if ('components' in component) {
		return Math.max(
			...component.components.map((c) =>
				computeIterations(c, executeExpression)
			)
		);
	}
	return 0;
}

/**
 * Check controls on a component for each iteration
 * Errors are returned using a map of id suffixed with the iteration index (ex: {prenom-1: [], prenom-3: []})
 */
function checkComponentInLoop(
	state: StateForControls,
	component: ComponentDefinition | InterpretedLoopComponent,
	errors: Record<string, LunaticError[]>
): Record<string, LunaticError[]> {
	// The component has no controls, skip it
	if ('controls' in component && !Array.isArray(component.controls)) {
		return errors;
	}

	// Execute control for each iteration
	const iterations = computeIterations(component, state.executeExpression);
	for (let i = 0; i < iterations; i++) {
		// Create a pager representing the iteration we want to check
		const iterationPager = {
			...state.pager,
			iteration: i,
			nbIterations: iterations,
		};
		// There is no controls on this component
		if (!('controls' in component) || !component.controls) {
			continue;
		}
		// The component is filtered on this iteration, skip it
		if (
			// conditionFilter can be the interpreted expression, or the object representing the expression
			('conditionFilter' in component &&
				component.conditionFilter &&
				typeof component.conditionFilter == 'object' &&
				'value' in component.conditionFilter &&
				!state.executeExpression(
					{ value: component.conditionFilter.value, type: 'VTL' },
					iterationPager
				)) ||
			// @ts-ignore
			component.conditionFilter === false
		) {
			continue;
		}
		const componentErrors = checkControls(
			component.controls,
			state.executeExpression,
			iterationPager
		);
		if (componentErrors.length > 0) {
			errors[`${component.id}-${i}`] = componentErrors;
		}
	}

	return errors;
}

/**
 * Check if there is a critical error (type: "Error" and criticality: "Format")
 */
function hasCriticalError(errors?: Record<string, LunaticError[]>): boolean {
	if (!errors) {
		return false;
	}
	// Look for at least one critical error in the list
	const criticalError = Object.values(errors)
		.flat()
		.find(
			(error) =>
				error.criticality.startsWith('ERROR') ||
				error.typeOfControl === 'FORMAT'
		);
	return criticalError !== undefined;
}

/**
 * Check controls for currently visible components and output errors
 */
export function compileControls(state: StateForControls) {
	const components = replaceComponentSequence(getComponentsFromState(state));
	const componentFiltered = components
		.map((component) => fillComponentExpressions(component, state))
		.filter((component) => {
			if ('conditionFilter' in component) {
				return component.conditionFilter ?? true;
			}
			return true;
		});
	let errors = checkComponents(state, componentFiltered);
	const currentErrors = Object.keys(errors).length > 0 ? errors : undefined;
	return {
		currentErrors,
		isCritical: hasCriticalError(currentErrors),
	};
}
