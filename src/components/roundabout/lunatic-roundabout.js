import React, { useCallback } from 'react';
import Roundabout from './roundabout';
import Redirect from './redirect';

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
	custom,
}) {
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

	if (iterations === 1) {
		return <Redirect goToIteration={goToIteration} iteration={0} />;
	}

	return (
		<Roundabout
			label={label}
			expressions={expressions}
			iterations={iterations}
			goToIteration={goToIteration}
			locked={locked}
			custom={custom}
		/>
	);
}

export default LunaticRoundabout;
