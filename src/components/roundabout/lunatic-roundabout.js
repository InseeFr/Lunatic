import React, { useEffect, useState, useCallback } from 'react';
import Roundabout from './roundabout';

/**
 *  Logique fonctionnelle et immuable du composant
 */
function LunaticRoundabout({ iterations, expressions, goToPage, pageLoop }) {
	const { complete, partial, label } = expressions;

	const goToIteration = useCallback(
		function (iteration) {
			goToPage({ page: pageLoop, iteration, nbIterations: iterations });
		},
		[goToPage, pageLoop, iterations]
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
