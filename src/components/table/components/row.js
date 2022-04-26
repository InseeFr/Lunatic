import React from 'react';
import { Tr as HtmlTr } from '../../commons/components/html-table';
import Cell from './cell';

function Row({
	id,
	custom,
	components,
	executeExpression,
	valueMap,
	rowIndex,
	iteration,
	handleChange,
}) {
	const content = components.map(function (content, index) {
		return (
			<Cell
				id={id}
				content={content}
				custom={custom}
				value={valueMap}
				executeExpression={executeExpression}
				handleChange={handleChange}
				iteration={iteration}
				row={rowIndex}
				index={index}
				key={index}
			/>
		);
	});
	return (
		<HtmlTr id={id} custom={custom} row={rowIndex}>
			{content}
		</HtmlTr>
	);
}

export default Row;
