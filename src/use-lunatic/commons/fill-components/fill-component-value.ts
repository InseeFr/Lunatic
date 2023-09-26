import type { LunaticComponentDefinition, LunaticState } from '../../type';
import { hasResponse, hasResponses } from '../component';
import { string } from 'prop-types';
import { isNumber } from '../../../utils/number';

export type FilledProps = { value?: unknown };

export function fillComponentValue(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	return {
		...component,
		value: getValueForComponent(component, state),
	};
}

function getValueForComponent(
	component: LunaticComponentDefinition,
	state: LunaticState
): unknown {
	if (hasResponses(component)) {
		return Object.entries(
			component.responses?.map(({ response }) => [
				response.name,
				state.variables.get(
					response.name,
					isNumber(state.pager.iteration) ? [state.pager.iteration] : undefined
				),
			]) ?? []
		);
	}
	if (hasResponse(component)) {
		return state.variables.get(
			component.response.name,
			isNumber(state.pager.iteration) ? [state.pager.iteration] : undefined
		);
	}
	return null;
}
