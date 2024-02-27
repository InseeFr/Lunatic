import './Roundabout.scss';
import { useCallback } from 'react';
import { CustomRoundabout } from './CustomRoundabout';
import type { LunaticComponentProps } from '../type';

/**
 * Roundabout is a special loop component where the user can select the iteration to go to
 */
export function Roundabout({
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
		<CustomRoundabout
			label={label}
			expressions={expressions}
			iterations={iterations}
			goToIteration={goToIteration}
			locked={locked}
		/>
	);
}
