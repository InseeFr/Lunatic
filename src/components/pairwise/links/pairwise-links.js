import React, { useCallback } from 'react';
import LinksOrchestrator from './links-orchestrator';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

const PairwiseLinks = ({
	declarations,
	components,
	handleChange,
	valueMap,
	missing,
	shortcut,
	features,
	preferences,
	management,
	executeExpression,
	xAxis,
	yAxis,
	custom,
}) => {
	const nbRows = xAxis * yAxis;
	const handleChangeLinks = useCallback(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[handleChange, nbRows]
	);

	if (nbRows > 0)
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} custom={custom} />
				<DeclarationsAfterText declarations={declarations} custom={custom} />
				<LinksOrchestrator
					components={components}
					handleChange={handleChangeLinks}
					nbRows={nbRows}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					executeExpression={executeExpression}
					custom={custom}
					xAxis={xAxis}
				/>
				<DeclarationsDetachable declarations={declarations} custom={custom} />
			</>
		);

	return null;
};

export default PairwiseLinks;
