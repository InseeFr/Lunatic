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

	return getFlatComponentsInLoop(definition).reduce((acc, component) => {
		if (!hasResponse(component)) {
			return acc;
		}
		const value = state.variables.get(
			component.response.name,
			isNumber(state.pager.iteration) ? [state.pager.iteration] : undefined
		);
		if (Array.isArray(value) && value.length > acc) {
			return value.length;
		}
		return acc;
	}, 0);
}

function getFlatComponentsInLoop(
	definition: LunaticComponentDefinition
): LunaticComponentDefinition[] {
	if (
		definition.componentType !== 'RosterForLoop' &&
		definition.componentType !== 'Loop'
	) {
		return [definition];
	}

	return definition.components.reduce((acc, component) => {
		if (component.componentType === 'Question')
			return [...acc, ...component.components];
		return [...acc, component];
	}, [] as LunaticComponentDefinition[]);
}
