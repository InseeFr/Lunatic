import React, { useCallback } from 'react';
import { Tr, Td } from '../../commons/components/html-table';
import { RowComponent } from '../commons';

function Row({
	id,
	components,
	valueMap,
	rowIndex,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	executeExpression,
}) {
	const handleChangeRow = useCallback(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	if (Array.isArray(components)) {
		return (
			<Tr id={id}>
				{components.map(function (component, index) {
					const { response, id } = component;
					const idComponent = `${id}-${rowIndex + 1} `;
					let value = undefined;
					if (response) {
						const { name } = response;
						if (name in valueMap) {
							value = valueMap[name][rowIndex] || '';
						}
					}

					return (
						<Td id={idComponent}>
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
							/>
						</Td>
					);
				})}
			</Tr>
		);
	}
	return <Tr id={id}></Tr>;
}

export default Row;
