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
		xAxisIterations,
		custom,
		errors,
	}) {
		if (nbRows > 0) {
			return new Array(nbRows).fill(null).map(function (_, index) {
				const i = Math.trunc(index / xAxisIterations);
				const j = index % xAxisIterations;
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
						errors={errors}
					/>
				);
			});
		}
		return null;
	};
}

export default createRowOrchestrator;
