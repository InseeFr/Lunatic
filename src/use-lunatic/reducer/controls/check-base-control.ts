import { type ReactNode } from 'react';
import type {
	LunaticControl,
	LunaticError,
	LunaticReducerState,
} from '../../type';

export function checkBaseControl(
	controlItem: LunaticControl,
	executeExpression: LunaticReducerState['executeExpression'],
	pager: LunaticReducerState['pager']
): LunaticError | undefined {
	console.debug('[checkControls]', controlItem, pager);
	const { iteration, linksIterations } = pager;
	const { criticality, errorMessage, id, typeOfControl, control } = controlItem;

	// There is no control expression for this control (this is unexpected)
	if (!control) {
		return undefined;
	}

	console.debug('[executeExpression]', control, linksIterations ?? iteration);
	const result = executeExpression(control, {
		iteration: linksIterations ?? iteration,
	});
	console.debug(result);

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
	} catch {
		console.warn(`Error on validating control ${control.value}`);
		return undefined;
	}
}
