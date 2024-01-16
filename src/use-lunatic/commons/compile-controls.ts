import { replaceComponentSequence } from '../replace-component-sequence';
import type {
	LunaticComponentDefinition,
	LunaticControl,
	LunaticError,
	LunaticState,
} from '../type';
import { ControlTypeEnum, Criticality, TypeOfControl } from '../type-source';
import fillComponentExpressions from './fill-components/fill-component-expressions';
import getComponentsFromState from './get-components-from-state';
import { checkRoundaboutControl } from '../reducer/controls/check-roundabout-control';
import { checkBaseControl } from '../reducer/controls/check-base-control';
import type { FilledLunaticComponentProps } from './fill-components/fill-components';

export type StateForControls = Pick<
	LunaticState,
	'pager' | 'pages' | 'isInLoop' | 'executeExpression'
>;

type ComponentDefinition =
	| LunaticComponentDefinition
	| FilledLunaticComponentProps;

const isLoopComponent = (
	component: ComponentDefinition
): component is ComponentDefinition & {
	componentType: 'Loop' | 'RosterForLoop';
} => {
	return ['Loop', 'RosterForLoop'].includes(component.componentType);
};

/**
 * Check if components of the current page have errors, and return a map of error (indexed by component ID)
 */
function checkComponents(
	state: StateForControls,
	components: ComponentDefinition[]
): Record<string, LunaticError[]> {
	let errors = {} as Record<string, LunaticError[]>;

	for (const component of components) {
		const { controls, id } = component;

		// The component has global level controls
		if (Array.isArray(controls)) {
			const componentErrors = checkControls(
				controls.filter((c) => c.type !== ControlTypeEnum.row),
				state.executeExpression,
				state.pager
			);
			if (componentErrors.length > 0) {
				errors[id] = componentErrors;
			}
		}

		// For loop, inspect children
		if (isLoopComponent(component)) {
			const rowControls = component.controls?.filter(
				(c) => c.type === ControlTypeEnum.row
			);
			if (rowControls?.length) {
				console.log('ERROR', component);
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
	executeExpression: LunaticState['executeExpression'],
	pager: LunaticState['pager']
): LunaticError[] {
	return controls
		.map((control) => {
			switch (control.type) {
				case ControlTypeEnum.roundabout:
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
	component: ComponentDefinition,
	executeExpression: LunaticState['executeExpression']
): number {
	if (
		'iterations' in component &&
		component.iterations &&
		typeof component.iterations === 'object' &&
		'value' in component.iterations
	) {
		return executeExpression<number>(component.iterations.value);
	}
	if ('response' in component) {
		const value = executeExpression(component.response.name);
		if (Array.isArray(value)) {
			return value.length;
		}
	}
	// Look at the first component
	if ('components' in component) {
		return computeIterations(component.components[0], executeExpression);
	}
	return 0;
}

/**
 * Check controls on a component for each iteration
 * Errors are returned using a map of id suffixed with the iteration index (ex: {prenom-1: [], prenom-3: []})
 */
function checkComponentInLoop(
	state: StateForControls,
	component: ComponentDefinition,
	errors: Record<string, LunaticError[]>
): Record<string, LunaticError[]> {
	// The component has no controls, skip it
	if (!Array.isArray(component.controls)) {
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
		// The component is filtered on this iteration, skip it
		if (
			// conditionFilter can be the interpreted expression, or the object representing the expression
			(typeof component.conditionFilter == 'object' &&
				!state.executeExpression(
					component.conditionFilter.value,
					iterationPager
				)) ||
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
				error.criticality.startsWith(Criticality.ERROR) ||
				error.typeOfControl === TypeOfControl.FORMAT
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
		.filter(({ conditionFilter }) => {
			return conditionFilter ?? true;
		});
	let errors = checkComponents(state, componentFiltered);
	const currentErrors = Object.keys(errors).length > 0 ? errors : undefined;
	return {
		currentErrors,
		isCritical: hasCriticalError(currentErrors),
	};
}
