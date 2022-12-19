import React, { useEffect, useState, useCallback } from 'react';
import Roundabout from './roundabout';

function compileValidation(iterations, validation, executeExpression) {
	if (typeof iterations === 'number' && iterations > 0) {
		return Object.entries(validation).reduce(function (
			result,
			[name, expression]
		) {
			const values = new Array(iterations).fill(null).map((_, iteration) => {
				return executeExpression(expression, { iteration });
			});
			return { ...result, [name]: values };
		},
		{});
	}

	return {};
}

/**
 *  Logique fonctionnelle et immuable du composant
 */
function LunaticRoundabout({
	iterations,
	expressions,
	executeExpression,
	goToPage,
	pageLoop,
}) {
	const [complete, setComplete] = useState(undefined);
	const [partial, setPartial] = useState(undefined);
	const [label, setLabel] = useState(undefined);

	useEffect(
		function () {
			const results = compileValidation(
				iterations,
				expressions,
				executeExpression
			);
			setComplete(results.complete);
			setPartial(results.partial);
			setLabel(results.label);
		},
		[iterations, expressions, executeExpression]
	);

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
