import React from 'react';
import { Table } from '../../commons/components/html-table';
import Header from './header';
import Body from './body';
import './roster.scss';
import { NothingToDisplay } from '../../commons';

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
					id={id}
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
	return <NothingToDisplay />;
}

export default RosterTable;
