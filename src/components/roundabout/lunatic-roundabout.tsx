import React, { useCallback } from 'react';
import Roundabout from './roundabout';
import Redirect from './redirect';
import { LunaticComponentProps } from '../type';

/**
 *  Logique fonctionnelle et immuable du composant
 */
function LunaticRoundabout({
	iterations,
	expressions,
	goToPage,
	page,
	label,
	locked,
}: LunaticComponentProps<'Roundabout'>) {
	const goToIteration = useCallback(
		function (iteration: number) {
			goToPage({
				page,
				subPage: 0,
				iteration,
				nbIterations: iterations,
			});
		},
		[goToPage, page, iterations]
	);

	return (
		<Roundabout
			label={label}
			expressions={expressions}
			iterations={iterations}
			goToIteration={goToIteration}
			locked={locked}
		/>
	);
}

export default LunaticRoundabout;
