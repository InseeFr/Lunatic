import type { LunaticComponentDefinition, LunaticState } from '../../type';
import { hasResponse, hasResponses } from '../component';
import { isNumber } from '../../../utils/number';

export type FilledProps = { value?: unknown };

export function fillComponentValue(
	component: LunaticComponentDefinition,
	state: Pick<LunaticState, 'pager' | 'variables'>
): LunaticComponentDefinition & FilledProps {
	return {
		...component,
		value: getValueForComponent(component, state),
	};
}

function getValueForComponent(
	component: LunaticComponentDefinition,
	state: Pick<LunaticState, 'pager' | 'variables'>
): unknown {
	let iteration = isNumber(state.pager.iteration)
		? [state.pager.iteration]
		: undefined;
	if (state.pager.linksIterations) {
		iteration = state.pager.linksIterations;
	}
	if (hasResponses(component)) {
		return Object.fromEntries(
			component.responses?.map(({ response }) => [
				response.name,
				state.variables.get(response.name, iteration),
			]) ?? []
		);
	}
	if (hasResponse(component)) {
		return state.variables.get(component.response.name, iteration);
	}
	// For loop, value will be a map of child component values
	if ('components' in component) {
		return Object.fromEntries(
			component.components
				.map((c) => ('response' in c ? c.response.name : null))
				.filter((name) => name !== null)
				.map((name) => [name, state.variables.get(name!)])
		);
	}
	return null;
}
