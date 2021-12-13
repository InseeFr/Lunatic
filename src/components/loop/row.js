import React, { useCallback } from 'react';
import * as lunatic from 'components';

function RowComponent({
	id,
	component,
	handleChange,
	features,
	missing,
	shortcut,
	management,
	preferences,
	value,
}) {
	const { componentType } = component;
	const Component = lunatic[componentType];
	return (
		<Component
			{...component}
			id={id}
			handleChange={handleChange}
			preferences={preferences}
			management={management}
			features={features}
			missing={missing}
			shortcut={shortcut}
			value={value}
		/>
	);
}

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
}) {
	const handleChangeRow = useCallback(
		function (response, value) {
			handleChange(response, value, { index: rowIndex });
		},
		[handleChange, rowIndex]
	);

	return components.reduce(function (row, component) {
		const { response, id, componentType } = component;
		const idComponent = `${id}-${rowIndex + 1} `;
		let value = undefined;
		if (response) {
			const { name } = response;
			value = valueMap[name];
		}

		if (componentType in lunatic) {
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
				/>,
			];
		}
		return row;
	}, []);
}

export default Row;
