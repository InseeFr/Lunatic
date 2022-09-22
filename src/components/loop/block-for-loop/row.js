import React, { useCallback } from 'react';
import { OrchestratedComponent } from '../../commons';

function Row({
	components,
	valueMap = {},
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	rowIndex,
	executeExpression,
	custom,
}) {
	const handleChangeRow = useCallback(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	return components.reduce(function (row, component) {
		const { response, id } = component;
		const idComponent = `${id}-${rowIndex} `;

		let value = undefined;
		if (response) {
			const { name } = response;
			const valueArray = valueMap[name];
			if (Array.isArray(valueArray)) {
				value = valueArray[rowIndex] || '';
			}
		}

		return [
			...row,
			<OrchestratedComponent
				component={component}
				key={idComponent}
				handleChange={handleChangeRow}
				features={features}
				missing={missing}
				shortcut={shortcut}
				management={management}
				value={value}
				id={idComponent}
				preferences={preferences}
				iteration={rowIndex}
				executeExpression={executeExpression}
				custom={custom}
			/>,
		];
	}, []);
}

export default Row;
