import React, { useCallback } from 'react';
import LinksOrchestrator from './orchestrator';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import { Errors } from '../../commons';
import NothingToDisplay from '../../commons/components/nothing-to-display';

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
	custom,
	id,
	errors,
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
				<DeclarationsBeforeText
					declarations={declarations}
					id={id}
					custom={custom}
				/>
				<DeclarationsAfterText
					declarations={declarations}
					id={id}
					custom={custom}
				/>
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
					custom={custom}
					xAxisIterations={xAxisIterations}
				/>
				<DeclarationsDetachable
					declarations={declarations}
					id={id}
					custom={custom}
				/>
				<Errors errors={errors} />
			</>
		);

	return <NothingToDisplay />;
};

export default PairwiseLinks;
