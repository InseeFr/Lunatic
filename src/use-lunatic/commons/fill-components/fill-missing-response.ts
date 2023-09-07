import type { LunaticComponentDefinition, LunaticState } from '../../type';

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

	const { missingResponse } = component;
	const { variables, pager } = state;
	const { name } = missingResponse;
	if (name in variables) {
		const { value } = variables[name];
		const missingValue =
			pager.iteration === undefined
				? value
				: (value as unknown[])[pager.iteration];
		return {
			...component,
			missingResponse: { ...missingResponse, value: missingValue },
		};
	}

	return component;
}

export default fillMissingResponse;
