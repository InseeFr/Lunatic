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
	custom,
}) {
	if (nbRows > 0) {
		return (
			<Table id={id} custom={custom}>
				<Header header={header} id={id} custom={custom} />
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
					custom={custom}
				/>
			</Table>
		);
	}
	return <NothingToDisplay />;
}

export default RosterTable;
