import React, { useEffect } from 'react';

type Props = {
	goToIteration: (n: number) => void,
	iteration: number,
};

function Redirect({ goToIteration, iteration }: Props) {
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
