import { LunaticComponentDefinition, LunaticState } from '../../type';
import { extractValue } from '../../../utils/array';

export type FilledProps = {
	missingResponse?: LunaticComponentDefinition['missingResponse'] & {
		value?: unknown;
	};
};

/**
 * Inject the value for the missingResponse variable
 */
function fillMissingResponse<T extends LunaticComponentDefinition>(
	component: LunaticComponentDefinition,
	state: LunaticState
): LunaticComponentDefinition & FilledProps {
	const { missingResponse } = component;
	const {
		variables,
		pager: { iteration },
	} = state;
	if (missingResponse) {
		const { name } = missingResponse;
		if (name in variables) {
			const { value } = variables[name];
			const missingValue =
				iteration === undefined ? value : extractValue(value, iteration);
			return {
				...component,
				missingResponse: { ...missingResponse, value: missingValue },
			};
		}
	}

	return component;
}

export default fillMissingResponse;
