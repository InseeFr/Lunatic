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
type InterpretedRoundaboutComponent = DeepTranslateExpression<
	ComponentDefinition & {
		componentType: 'Roundabout';
	}
>;

/**
 * Check if the component is a Loop or a RosterForLoop
 */
const isLoopComponent = (
	component: ComponentDefinition | InterpretedComponent
): component is InterpretedLoopComponent => {
	return ['Loop', 'RosterForLoop'].includes(component.componentType);
};

/**
 * Check if the component is a Roundabout
 */
const isRoundaboutComponent = (
	component: ComponentDefinition | InterpretedComponent
): component is InterpretedRoundaboutComponent => {
	return component.componentType === 'Roundabout';
};

const isQuestionComponent = (
	component: ComponentDefinition | InterpretedComponent
) => {
	return 'Question' === component.componentType;
};

/**
 * Check if components of the current page have errors, and return a map of
 * errors (indexed by component ID).
 */
function checkComponents(
	state: StateForControls,
	components: (ComponentDefinition | InterpretedComponent)[],
	currentErrors?: Record<string, LunaticError[]>
): Record<string, LunaticError[]> {
	let errors = currentErrors ?? ({} as Record<string, LunaticError[]>);

	for (const component of components) {
		// The component has global level controls
		if ('controls' in component && Array.isArray(component.controls)) {
			const componentErrors = checkControls(
				component.controls.filter((c) => c.type !== 'ROW'),
				state.executeExpression,
				state.pager
			);
			if (componentErrors.length > 0) {
				errors[component.id] = componentErrors;
			}
		}

		// For Loop and RosterForLoop, inspect iterations for row controls
		if (isRoundaboutComponent(component))
			errors = checkRoundabout(state, component, errors);

		// For Loop and RosterForLoop, inspect children
		if (isLoopComponent(component))
			errors = checkLoop(state, component, errors);

		// For Question, loop over children
		if (isQuestionComponent(component))
			errors = checkComponents(state, component.components, errors);
	}

	return errors;
}

function checkRoundabout(
	state: StateForControls,
	component: InterpretedRoundaboutComponent,
	errors: Record<string, LunaticError[]>
) {
	const rowControls = component.controls?.filter((c) => c.type === 'ROW');
	if (rowControls?.length) {
		errors = checkComponentInLoop(
			state,
			{ ...component, controls: rowControls },
			errors
		);
	}
	return errors;
}

function checkLoop(
	state: StateForControls,
	component: InterpretedLoopComponent,
	errors: Record<string, LunaticError[]>
) {
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
	return errors;
}

function checkControls(
	controls: LunaticControl[],
	executeExpression: LunaticReducerState['executeExpression'],
	pager: LunaticReducerState['pager']
): LunaticError[] {
	return controls
		.map((control) => {
			if (control.type === 'roundabout') {
				return checkRoundaboutControl(control, executeExpression);
			}
			return checkBaseControl(control, executeExpression, pager);
		})
		.filter((error) => error !== undefined);
}

/**
 * Figure out the number of iterations of a component.
 */
function computeIterations(
	component: InterpretedComponent | ComponentDefinition,
	executeExpression: LunaticReducerState['executeExpression']
): number {
	console.debug('[computeIterations]', component);
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
		console.debug('response ->', value);
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
	component:
		| ComponentDefinition
		| InterpretedLoopComponent
		| InterpretedRoundaboutComponent,
	errors: Record<string, LunaticError[]>
): Record<string, LunaticError[]> {
	// For Question, loop over children
	if (component.componentType === 'Question') {
		for (const child of component.components) {
			errors = checkComponentInLoop(state, child, errors);
		}
		return errors;
	}

	// The component has no controls, skip it
	if ('controls' in component && !Array.isArray(component.controls)) {
		console.debug('The component has no controls, skip it');
		return errors;
	}

	// Execute control for each iteration
	const iterations = computeIterations(component, state.executeExpression);
	console.debug('iterations', iterations);
	for (let i = 0; i < iterations; i++) {
		// Create a pager representing the iteration we want to check
		const iterationPager = {
			...state.pager,
			iteration: i,
			nbIterations: iterations,
		};
		// There is no controls on this component
		if (!('controls' in component) || !component.controls) {
			console.debug('There is no controls on this component');
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
			// @ts-expect-error TS doesn't understand that conditionFilter is a boolean here
			component.conditionFilter === false
		) {
			console.debug('The component is filtered on this iteration, skip it');
			continue;
		}
		console.debug('[checkControls]');
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
 * Check controls for currently visible components and output errors.
 */
export function compileControls(state: StateForControls) {
	console.debug('[compileControls]', state.variables?.get('PRES_SAL'));
	const components = getComponentsFromState(state);
	const componentFiltered = components
		.map((component) => fillComponentExpressions(component, state))
		.filter((component) => {
			if ('conditionFilter' in component) {
				return component.conditionFilter ?? true;
			}
			return true;
		});
	const errors = checkComponents(state, componentFiltered);
	const currentErrors = Object.keys(errors).length > 0 ? errors : undefined;
	return {
		currentErrors,
		isCritical: hasCriticalError(currentErrors),
	};
}
