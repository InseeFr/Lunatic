import { ReactNode } from 'react';
import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';

export function validateSimple(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { executeExpression } = state;
	const { iteration, linksIterations } = state.pager ?? {};
	const { criticality, errorMessage, id, typeOfControl } = control;
	const { control: { value = 'true' } = {} } = control;

	const result = executeExpression(value, { iteration, linksIterations });

	try {
		if (!result) {
			const label = executeExpression<ReactNode>(errorMessage, {
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
