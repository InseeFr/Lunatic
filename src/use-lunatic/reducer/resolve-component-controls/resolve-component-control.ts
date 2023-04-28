import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';
import { resolveRoundaboutControl } from './resolve-roundabout-control';
import { ControlTypeEnum } from '../../type-source';
import { resolveSimpleControl } from './resolve-simple-control';

function resolveControl(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { type } = control;
	switch (type) {
		case ControlTypeEnum.roundabout:
			return resolveRoundaboutControl(state, control);
		case ControlTypeEnum.simple:
		default:
			return resolveSimpleControl(state, control);
	}
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
