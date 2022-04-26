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
		management,
		preferences,
		executeExpression,
		iteration,
		custom,
	}) {
		if (nbRows > 0) {
			return new Array(nbRows).fill(null).map(function (_, index) {
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
						custom={custom}
						/** */
						features={features}
						shortcut={shortcut}
						preferences={preferences}
						management={management}
						missing={missing}
					/>
				);
			});
		}
		return null;
	};
}

export default createRowOrchestrator;
