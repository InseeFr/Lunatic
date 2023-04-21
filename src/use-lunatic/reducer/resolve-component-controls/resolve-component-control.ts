import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';
import { resolveRoundaboutControl } from './resolve-roundabout-control';
import { resolveSimpleControl } from './resolve-simple-control';

function resolveControl(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	if (control.roundabout) {
		return resolveRoundaboutControl(state, control);
	}
	return resolveSimpleControl(state, control);
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
