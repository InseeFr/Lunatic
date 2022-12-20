import React, { useCallback } from 'react';
import Roundabout from './roundabout';

/**
 *  Logique fonctionnelle et immuable du composant
 */
function LunaticRoundabout({ iterations, expressions, goToPage, page }) {
	const { complete, partial, label } = expressions;

	const goToIteration = useCallback(
		function (iteration) {
			goToPage({
				page,
				iteration,
				nbIterations: iterations,
				roundabout: { page },
			});
		},
		[goToPage, page, iterations]
	);

	return (
		<Roundabout
			complete={complete}
			partial={partial}
			label={label}
			iterations={iterations}
			goToIteration={goToIteration}
		/>
	);
}

export default LunaticRoundabout;
