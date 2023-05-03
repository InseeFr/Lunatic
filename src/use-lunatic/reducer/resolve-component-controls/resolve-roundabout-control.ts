import { ReactNode } from 'react';
import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';

/**
 * Pour le Roundabout, le controle doit être validé pour chaque itération
 * composants l'unité enquêtée.
 * Itération prend pour valeur le rang de l'unité stat au sein de l'unité enquêté.
 * Le rondpoint ne peut pas être placé dans une boucle car l'itération est effacée.
 * TODO intégrer cela dans le cadre de boucle de bloucle.
 */
export function resolveRoundaboutControl(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { executeExpression } = state;
	const { criticality, errorMessage, id, typeOfControl, iterations } = control;
	const value = control?.control?.value ?? 'true';

	if (!iterations || iterations <= 0) {
		return undefined;
	}

	const errors = Array.from({ length: iterations }, (_, k) => k)
		/**
		 * Currently, the controls are lifted when the condition is false.
		 * An evolution is planned on the questionnaire generation side (Eno) to come back to a more coherent logic (i.e. lift the control when the condition is true)
		 *
		 * After this change, we have to change the next line to `.filter((iteration) => executeExpression(value, { iteration }))`
		 */
		.filter((iteration) => !executeExpression(value, { iteration }))
		.map((iteration) =>
			executeExpression<ReactNode>(errorMessage, { iteration })
		);

	if (errors.length) {
		return { criticality, errorMessage: errors, id, typeOfControl };
	}

	return undefined;
}
