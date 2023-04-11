import React, { useCallback } from 'react';
import LinksOrchestrator from './orchestrator';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import NothingToDisplay from '../commons/components/nothing-to-display';
import { LunaticComponentProps } from '../type';

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
}: LunaticComponentProps<'PairwiseLinks'>) => {
	const nbRows = xAxisIterations * yAxisIterations;

	console.log('lunatic', 'pairwise', value);

	if (nbRows <= 1) {
		return <NothingToDisplay />;
	}

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<DeclarationsAfterText declarations={declarations} id={id} />
			<LinksOrchestrator
				id={id}
				components={components}
				handleChange={handleChange}
				nbRows={nbRows}
				value={value}
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
};

export default PairwiseLinks;