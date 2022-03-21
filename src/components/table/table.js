import React from 'react';
import {
	Table as HtmlTable,
	Tbody as HtmlTbody,
} from '../commons/components/html-table';
import Header from './header';
import TableOchestrator from './table-ochestrator';
import './table.scss';

function Table({
	cells,
	custom,
	id,
	executeExpression,
	value,
	handleChange,
	iteration,
}) {
	return (
		<HtmlTable id={id} custom={custom} className="table-lunatic">
			<Header id={id} custom={custom} />
			<HtmlTbody id={id} custom={custom}>
				<TableOchestrator
					custom={custom}
					cells={cells}
					id={id}
					value={value}
					handleChange={handleChange}
					executeExpression={executeExpression}
					iteration={iteration}
				/>
			</HtmlTbody>
		</HtmlTable>
	);
}

export default Table;
