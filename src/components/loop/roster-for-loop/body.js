import React, { useCallback } from 'react';
import TBody from './html-table/tbody';
import RosterForLoopOrchestrator from './roster-for-loop-orchestrator';

function Body({
	id,
	components,
	nbRows,
	executeExpression,
	handleChange,
	valueMap,
	missing,
	management,
	features,
	preferences,
}) {
	const handleChangeRow = useCallback(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[nbRows, handleChange]
	);

	if (nbRows > 0) {
		return (
			<TBody id={id}>
				<RosterForLoopOrchestrator
					components={components}
					nbRows={nbRows}
					handleChange={handleChangeRow}
					executeExpression={executeExpression}
					valueMap={valueMap}
					missing={missing}
					management={management}
					features={features}
					preferences={preferences}
				/>
			</TBody>
		);
	}
	return null;
}

export default Body;
