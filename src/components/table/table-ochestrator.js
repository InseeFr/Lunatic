import React from 'react';
import Row from './row';

function TableOchestrator({
	cells,
	custom,
	id,
	executeExpression,
	value,
	handleChange,
	iteration,
}) {
	if (Array.isArray(cells)) {
		return cells.map(function (columns, index) {
			return (
				<Row
					key={index}
					row={index}
					columns={columns}
					id={id}
					value={value}
					handleChange={handleChange}
					iteration={iteration}
					executeExpression={executeExpression}
					custom={custom}
				/>
			);
		});
	}
	return null;
}

export default TableOchestrator;
