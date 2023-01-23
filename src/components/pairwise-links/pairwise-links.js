import React, { useCallback } from 'react';
import LinksOrchestrator from './orchestrator';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import NothingToDisplay from '../commons/components/nothing-to-display';

const PairwiseLinks = ({
	declarations,
	components,
	handleChange,
	value,
	missing,
	shortcut,
	features,
	preferences,
	management,
	executeExpression,
	xAxisIterations,
	yAxisIterations,
	id,
	symLinks,
}) => {
	const nbRows = xAxisIterations * yAxisIterations;

	const handleChangeLinks = useCallback(
		function (response, value, args) {
			handleChange(response, value, args);
		},
		[handleChange]
	);

	if (nbRows > 1)
		return (
			<>
				<DeclarationsBeforeText declarations={declarations} id={id} />
				<DeclarationsAfterText declarations={declarations} id={id} />
				<LinksOrchestrator
					id={id}
					components={components}
					handleChange={handleChangeLinks}
					nbRows={nbRows}
					valueMap={value}
					management={management}
					missing={missing}
					shortcut={shortcut}
					features={features}
					preferences={preferences}
					executeExpression={executeExpression}
					xAxisIterations={xAxisIterations}
					yAxisIterations={yAxisIterations}
					symLinks={symLinks}
				/>
				<DeclarationsDetachable declarations={declarations} id={id} />
			</>
		);
	return <NothingToDisplay />;
};

export default PairwiseLinks;
