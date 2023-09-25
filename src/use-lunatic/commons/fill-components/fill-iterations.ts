import type { LunaticComponentDefinition, LunaticState } from '../../type';
import { hasResponse } from '../component';
import { forceInt } from '../../../utils/number';

/**
 * Fill the number of iterations for loop components without "iterations" expression
 */
export function fillIterations(
	component: LunaticComponentDefinition,
	state: LunaticState
) {
	if ('iterations' in component && component.iterations) {
		return {
			...component,
			iterations: forceInt(
				state.executeExpression(component.iterations, {
					iteration: state.pager.iteration,
				})
			),
		};
	}

	if (
		component.componentType !== 'RosterForLoop' &&
		component.componentType !== 'Loop'
	) {
		return component;
	}

	// Iterations expression is not present on the component definition
	// infer it from the value of child components
	const iterations = component.components.reduce((acc, component) => {
		if (!hasResponse(component)) {
			return acc;
		}
		const value = state.variables.get(
			component.response.name,
			state.pager.iteration
		);
		if (Array.isArray(value) && value.length > acc) {
			return value.length;
		}
		return acc;
	}, 0);

	return {
		...component,
		iterations,
	};
}
