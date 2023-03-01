import React, { useEffect } from 'react';

function Redirect({ goToIteration, iteration }) {
	useEffect(
		function () {
			if (typeof goToIteration === 'function') {
				goToIteration(iteration);
			}
		},
		[goToIteration, iteration]
	);

	return <></>;
}

export default Redirect;
