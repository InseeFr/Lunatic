import React, { useCallback } from 'react';
import Roundabout from './roundabout';
import Redirect from './redirect';
import { LunaticComponentProps } from '../type';
import { getPageTag } from '../../use-lunatic/commons';

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
			const pageTag = getPageTag({
				page,
				iteration,
				nbIterations: iterations,
				maxPage: '',
				subPage: 0,
				roundabout: { page },
			});
			goToPage({
				pageTag,
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
		/>
	);
}

export default LunaticRoundabout;
