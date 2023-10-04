import { type ReactNode } from 'react';
import { type StateForControls } from '../../commons/compile-controls';
import type { LunaticControl, LunaticError } from '../../type';

export function resolveSimpleControl(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { executeExpression } = state;
	const { iteration, linksIterations } = state.pager ?? {};
	const { criticality, errorMessage, id, typeOfControl } = control;
	const value = control?.control?.value ?? 'true';

	const result = executeExpression(value, {
		iteration: linksIterations ?? iteration,
	});

	try {
		/**
		 * Currently, the controls are lifted when the condition is false.
		 * An evolution is planned on the questionnaire generation side (Eno) to come back to a more coherent logic (i.e. lift the control when the condition is true)
		 *
		 * After this change, we have to change the next line to `if (!result) return undefined;`
		 */
		if (result) return undefined;

		const label = executeExpression<ReactNode>(errorMessage, {
			iteration,
		});
		return {
			criticality,
			errorMessage: label,
			id,
			typeOfControl,
		};
	} catch (e) {
		console.warn(`Error on validating control ${value}`);
		return undefined;
	}
}
