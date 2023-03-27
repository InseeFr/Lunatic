import { ReactNode } from 'react';
import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';

function resolveControl(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { executeExpression } = state;
	const { iteration, linksIterations } = state.pager ?? {};
	const { criticality, errorMessage, id, typeOfControl } = control;
	const { control: { value = 'true' } = {} } = control;
	try {
		const result = executeExpression(value, { iteration, linksIterations });
		if (!result) {
			const { value: labelValue } = errorMessage;
			const label = executeExpression<ReactNode>(labelValue, {
				iteration,
				linksIterations,
			});
			return {
				criticality,
				errorMessage: label,
				id,
				typeOfControl,
			};
		}
		return undefined;
	} catch (e) {
		console.warn(`Error on validating control ${value}`);
		return undefined;
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
