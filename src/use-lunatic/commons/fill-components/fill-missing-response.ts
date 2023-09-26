import type { LunaticComponentDefinition, LunaticState } from '../../type';
import missing from '../../../components/commons/components/missing';
import { isNumber } from '../../../utils/number';

export type FilledProps = {
	missingResponse?: {
		name: string;
		value?: unknown;
	};
};

/**
 * Inject the value for the missingResponse variable
 */
function fillMissingResponse(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	// Component does not have a missing response
	if (!('missingResponse' in component) || !component.missingResponse) {
		return component;
	}

	const missingResponse = component.missingResponse;
	return {
		...component,
		missingResponse: {
			...missingResponse,
			value: state.variables.get(
				missingResponse.name,
				isNumber(state.pager.iteration) ? [state.pager.iteration] : undefined
			),
		},
	};
}

export default fillMissingResponse;
