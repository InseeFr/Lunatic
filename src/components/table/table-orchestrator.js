import React from 'react';
import Row from './components/row';

function TableOrchestrator({
	body,
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
	if (Array.isArray(body)) {
		return body.map(function (components, index) {
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
