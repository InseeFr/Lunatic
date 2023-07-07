import React, { useCallback } from 'react';
import Roundabout from './roundabout';
import Redirect from './redirect';
import { LunaticComponentProps } from '../type';

/**
 *  Logique fonctionnelle et immuable du composant
 */
function LunaticRoundabout(props: LunaticComponentProps<'Roundabout'>) {
  const {
    iterations,
    expressions,
    goToPage,
    page,
    label,
    locked,
    handleGoIteration
  } = props;

  const goToIteration = useCallback(
    function (iteration: number) {
      if (handleGoIteration) {
        handleGoIteration();
      }
			goToPage({
				page,
				iteration,
				nbIterations: iterations,
				roundabout: { page },
			});
		},
		[goToPage, page, iterations, handleGoIteration]
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
