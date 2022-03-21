import React from 'react';

function createRowOchestrator(Row) {
	return function RowOrchestrator({
		id,
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
		iteration,
		custom,
	}) {
		return new Array(nbRows).fill(null).map(function (_, index) {
			return (
				<Row
					key={index}
					id={id}
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
					iteration={iteration}
					custom={custom}
				/>
			);
		});
	};
}

export default createRowOchestrator;
