import { ReactNode } from 'react';
import { StateForControls } from '../../commons/compile-controls';
import { LunaticControl, LunaticError } from '../../type';

/**
 * TODO à travailler !
 * @param nodes
 * @returns
 */
function join(nodes: Array<ReactNode>) {
	return nodes.reduce(function (acc: Array<ReactNode>, node: ReactNode) {
		if (typeof node === 'string') {
			return [...acc, `${node}\n`];
		}
		return [...acc, node];
	}, []);
}

/**
 * Pour le Roundabout, le controle doit être validé pour chaque itération
 * composant l'unité enquêtée.
 * Itération prend pour valeur le rang de l'unité stat au sein de l'unité enquêté.
 * Le rondpoint ne peut pas être placé dans une boucle car l'itération est effacée.
 * TODO intégrer cela dans le cadre de boucle de bloucle.
 *
 * @param state
 * @param control
 * @returns
 */
export function validateRoundabout(
	state: StateForControls,
	control: LunaticControl
): LunaticError | undefined {
	const { executeExpression } = state;

	const { criticality, errorMessage, id, typeOfControl, iterations } = control;
	const { control: { value = 'true' } = {} } = control;

	if (iterations && iterations > 0) {
		// compiles controls
		const errors = new Array(iterations)
			.fill(false)
			.reduce(function (acc, _, iteration) {
				const status = executeExpression(value, { iteration });
				if (!status) {
					const error = executeExpression<ReactNode>(errorMessage, {
						iteration,
					});
					return [...acc, error];
				}
				return acc;
			}, []);

		if (errors.length) {
			return { criticality, errorMessage: join(errors), id, typeOfControl };
		}
	}

	return undefined;
}
