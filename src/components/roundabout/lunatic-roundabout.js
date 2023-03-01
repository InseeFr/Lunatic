import React, { useCallback } from 'react';
import Roundabout from './roundabout';
import Redirect from './redirect';

/**
 *  Logique fonctionnelle et immuable du composant
 */
function LunaticRoundabout({
	iterations,
	expressions,
	goToIteration,
	label,
	locked,
}) {
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
