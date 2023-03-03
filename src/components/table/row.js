import React from 'react';
import { Tr as HtmlTr } from '../commons/components/html-table';
import Cell from './cell';

function Row({
	id,
	components,
	executeExpression,
	valueMap,
	rowIndex,
	iteration,
	handleChange,
	errors,
	paths,
}) {
	const row = components.map(function (content, index) {
		return (
			<Cell
				id={id}
				content={content}
				value={valueMap}
				executeExpression={executeExpression}
				handleChange={handleChange}
				iteration={iteration}
				row={rowIndex}
				index={index}
				key={index}
				errors={errors}
				paths={paths}
			/>
		);
	});
	return (
		<HtmlTr id={id} row={rowIndex}>
			{row}
		</HtmlTr>
	);
}

export default Row;
