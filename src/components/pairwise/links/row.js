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
	executeExpression,
	custom,
	linksIterations,
}) {
	const handleChangeRow = useCallback(
		function (response, value) {
			handleChange(response, value, { linksIterations });
		},
		[handleChange, linksIterations]
	);

	return components.reduce(function (row, component) {
		const { response, id } = component;
		const [x, y] = linksIterations;
		const idComponent = `${id}-${x + 1}-${y + 1} `;

		let value = undefined;
		if (response) {
			const { name } = response;
			const valueArray = valueMap[name];
			if (Array.isArray(valueArray) && Array.isArray(valueArray[x])) {
				value = valueArray[x][y] || '';
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
				linksIterations={linksIterations}
				executeExpression={executeExpression}
				custom={custom}
			/>,
		];
	}, []);
}

export default Row;
