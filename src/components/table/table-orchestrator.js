import React from 'react';
import Row from './components/row';

function TableOrchestrator({
	cells,
	custom,
	id,
	executeExpression,
	valueMap,
	handleChange,
	iteration,
	features,
	shortcut,
	preferences,
	management,
	missing,
}) {
	if (Array.isArray(cells)) {
		return cells.map(function (components, index) {
			return (
				<Row
					key={index}
					rowIndex={index}
					components={components}
					id={id}
					valueMap={valueMap}
					handleChange={handleChange}
					iteration={iteration}
					executeExpression={executeExpression}
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
}

export default TableOrchestrator;
