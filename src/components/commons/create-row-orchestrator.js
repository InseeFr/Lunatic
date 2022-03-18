import React from 'react';

function createRowOchestrator(Row) {
	return function RowOrchestrator({
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
		custom,
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
					custom={custom}
				/>
			);
		});
	};
}

export default createRowOchestrator;
