import React, { useEffect } from 'react';

type Props = {
	goToIteration: (n: number) => void;
	iteration: number;
};

export function RoundaboutRedirect({ goToIteration, iteration }: Props) {
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
