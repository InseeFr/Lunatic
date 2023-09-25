import type { LunaticComponentDefinition, LunaticState } from '../../type';
import { hasResponse } from '../component';

/**
 * Fill the number of iterations for loop components without "iterations" expression
 */
export function fillIterations(
	component: LunaticComponentDefinition,
	state: LunaticState
) {
	// Iterations expression is not present on the component definition
	if (!('components' in component && !('iterations' in component))) {
		return component;
	}
	// Infer the number of iterations from the value of child components
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
