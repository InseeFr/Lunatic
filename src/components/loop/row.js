import React, { useCallback } from 'react';
import RowComponent from './row-component';

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
}) {
	const handleChangeRow = useCallback(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	return components.reduce(function (row, component) {
		const { response, id } = component;
		const idComponent = `${id}-${rowIndex + 1} `;
		let value = undefined;
		if (response) {
			const { name } = response;
			value = valueMap[name][rowIndex] || '';
		}

		return [
			...row,
			<RowComponent
				component={component}
				key={id}
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
			/>,
		];
	}, []);
}

export default Row;
