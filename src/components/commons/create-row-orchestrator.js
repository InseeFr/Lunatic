import React from 'react';

function createRowOrchestrator(Row) {
	return function RowOrchestrator({
		id,
		components,
		nbRows,
		valueMap,
		handleChange,
		features,
		missing,
		shortcut,
		preferences,
		executeExpression,
		iteration,
		xAxis,
		custom,
	}) {
		if (nbRows > 0) {
			return new Array(nbRows).fill(null).map(function (_, index) {
				const i = index % xAxis;
				const j = Math.trunc(index / xAxis);
				return (
					<Row
						key={index}
						id={id}
						rowIndex={index}
						components={components}
						valueMap={valueMap}
						handleChange={handleChange}
						executeExpression={executeExpression}
						iteration={iteration}
						linksIterations={[i, j]}
						custom={custom}
						/** */
						features={features}
						shortcut={shortcut}
						preferences={preferences}
						missing={missing}
					/>
				);
			});
		}
		return null;
	};
}

export default createRowOrchestrator;
