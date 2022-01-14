import React from 'react';

function createOchestrator(Row) {
	return function LoopOrchestrator({
		components,
		nbRows,
		valueMap,
		handleChange,
		features,
		missing,
		shortcut,
		management,
		preferences,
		executeExpression,
	}) {
		return new Array(nbRows).fill(null).map(function (_, index) {
			return (
				<Row
					key={index}
					rowIndex={index}
					components={components}
					valueMap={valueMap}
					handleChange={handleChange}
					features={features}
					shortcut={shortcut}
					preferences={preferences}
					management={management}
					missing={missing}
					executeExpression={executeExpression}
				/>
			);
		});
	};
}

export default createOchestrator;
