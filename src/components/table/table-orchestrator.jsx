import React from 'react';
import Row from './row';

function TableOrchestrator({
	body,
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
	paths,
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
					paths={paths}
					/* */
					features={features}
					shortcut={shortcut}
					preferences={preferences}
					management={management}
					/* */
					missing={missing}
				/>
			);
		});
	}
	return null;
}

export default TableOrchestrator;
