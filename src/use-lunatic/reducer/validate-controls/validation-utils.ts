import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';
import { validateSimple } from './validate-simple';
import { validateRoundabout } from './validate-roundabout';

function resolveControl(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { roundabout } = control;

	if (roundabout) {
		return validateRoundabout(state, control);
	}
	return validateSimple(state, control);
}

/**
 * Convert controls into errors
 */
export function resolveComponentControls(
	state: StateForControls,
	controls: LunaticControl[]
): LunaticError[] {
	return controls.reduce(function (errors, control) {
		const error = resolveControl(state, control);
		if (error) {
			return [...errors, error];
		}
		return errors;
	}, [] as LunaticError[]);
}
