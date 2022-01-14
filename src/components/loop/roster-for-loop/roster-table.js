import React from 'react';
import Table from './html-table/table';
import Header from './header';
import Body from './body';
import './roster.scss';

function RosterTable({
	components,
	nbRows,
	executeExpression,
	id,
	header,
	valueMap,
	shortcut,
	missing,
	management,
	handleChange,
}) {
	if (nbRows > 0) {
		return (
			<Table id={id}>
				<Header header={header} id={id} />
				<Body
					components={components}
					handleChange={handleChange}
					nbRows={nbRows}
					valueMap={valueMap}
					management={management}
					missing={missing}
					shortcut={shortcut}
					executeExpression={executeExpression}
				/>
			</Table>
		);
	}
	return <div>Nothing to display!</div>;
}

export default RosterTable;
