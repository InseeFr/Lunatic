import React, { useCallback } from 'react';
import Roundabout from './roundabout';
import Redirect from './redirect';

export function isComplete(expressions = {}) {
	const { complete } = expressions;
	if (Array.isArray(complete)) {
		return complete.reduce((state, current) => state && current);
	}

	return false;
}

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
