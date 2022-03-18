import React, { useCallback } from 'react';
import { Tbody } from '../../commons/components/html-table';
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
	custom,
}) {
	const handleChangeRow = useCallback(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[nbRows, handleChange]
	);

	if (nbRows > 0) {
		return (
			<Tbody id={id} custom={custom}>
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
					custom={custom}
				/>
			</Tbody>
		);
	}
	return null;
}

export default Body;
