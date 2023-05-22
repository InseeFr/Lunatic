import React from 'react';
import { Table } from '../../commons/components/html-table';
import Header from './header';
import Body from './body';
import './roster.scss';
import { NothingToDisplay } from '../../commons';
import { LunaticComponentProps } from '../../type';

type Props = {
	nbRows: number;
	handleChange: (
		response: { name: string },
		value: unknown,
		args: { index: number; [k: string]: unknown }
	) => void;
} & Pick<
	LunaticComponentProps<'RosterForLoop'>,
	| 'id'
	| 'components'
	| 'executeExpression'
	| 'headers'
	| 'value'
	| 'management'
	| 'missing'
	| 'shortcut'
	| 'errors'
>;

function RosterTable({
	components,
	nbRows,
	executeExpression,
	id,
	headers,
	value: valueMap,
	shortcut,
	missing,
	management,
	handleChange,
}: Props) {
	console.log('lunatic', 'roster-table', headers);
	if (nbRows <= 0) {
		return <NothingToDisplay />;
	}
	return (
		<Table id={id}>
			<Header header={headers} id={id} />
			<Body
				id={id}
				components={components}
				handleChange={handleChange}
				nbRows={nbRows}
				value={valueMap}
				management={management}
				missing={missing}
				shortcut={shortcut}
				executeExpression={executeExpression}
			/>
		</Table>
	);
}

export default RosterTable;
