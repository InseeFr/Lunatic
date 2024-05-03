import { type ReactNode } from 'react';
import type { LunaticControl, LunaticError } from '../../type';
import type { LunaticReducerState } from '../../type';

/**
 * Pour le Roundabout, le controle doit être validé pour chaque itération
 * composants l'unité enquêtée.
 * Itération prend pour valeur le rang de l'unité stat au sein de l'unité enquêté.
 * Le rondpoint ne peut pas être placé dans une boucle car l'itération est effacée.
 * TODO intégrer cela dans le cadre de boucle de bloucle.
 */
export function checkRoundaboutControl(
	control: LunaticControl,
	executeExpression: LunaticReducerState['executeExpression']
): LunaticError | undefined {
	const { criticality, errorMessage, id, typeOfControl, iterations } = control;

	if (!iterations || iterations <= 0) {
		return undefined;
	}

	const errors = Array.from({ length: iterations }, (_, k) => k)
		// There is an error if the control is evaluated to "true"
		.filter(
			(iteration) =>
				control.control && !executeExpression(control.control, { iteration })
		)
		.map((iteration) =>
			executeExpression<ReactNode>(errorMessage, { iteration })
		);

	if (errors.length) {
		return { criticality, errorMessage: errors, id, typeOfControl };
	}

	return undefined;
}
