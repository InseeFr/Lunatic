import type {
	LunaticComponentDefinition,
	LunaticPager,
	LunaticReducerState,
} from '../type';
import { forceInt, isNumber } from '../../utils/number';
import { hasResponse } from '../commons/component';
import type { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';

export function getIterationsProp(
	definition: LunaticComponentDefinition,
	state: {
		pager: LunaticPager;
		variables: LunaticVariablesStore;
		executeExpression: LunaticReducerState['executeExpression'];
	}
): number | undefined {
	if ('iterations' in definition && definition.iterations) {
		return forceInt(
			state.executeExpression(definition.iterations, {
				iteration: state.pager.iteration,
			})
		);
	}

	if (
		definition.componentType !== 'RosterForLoop' &&
		definition.componentType !== 'Loop'
	) {
		return undefined;
	}

	// Iterations expression is not present on the component definition
	// infer it from the value of child components
	return computeMaxChildIterations(definition.components as LunaticComponentDefinition[], state);
}

function computeMaxChildIterations(
	components: LunaticComponentDefinition[],
	state: {
		pager: LunaticPager;
		variables: LunaticVariablesStore;
		executeExpression: LunaticReducerState['executeExpression'];
	}
): number {
	return components.reduce((acc, component) => {
		let iterations = 0;

		// If the component is a Question, we need to check into its children
		if (component.componentType === 'Question') {
			iterations = computeMaxChildIterations(component.components, state);
		}


		else if (hasResponse(component)) {
			const value = state.variables.get(
				component.response.name,
				isNumber(state.pager.iteration) ? [state.pager.iteration] : undefined
			);

			if (Array.isArray(value)) {
				iterations = value.filter((val) => val != null).length;
			} else if (
				value &&
				typeof value === 'object' &&
				Array.isArray(Object.values(value)[0])
			) {
				iterations = Object.values(value)[0].filter((val: any) => val != null).length;
			}
		}

		return Math.max(acc, iterations);
	}, 0);
}

