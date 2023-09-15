import { Table } from '../../commons/components/html-table';
import Header from './header';
import Body from './body';
import './roster.scss';
import { NothingToDisplay } from '../../commons';
import type { LunaticComponentProps } from '../../type';

type Props = {
	nbRows: number;
	handleChange: (
		response: { name: string },
		value: unknown,
		args: { index: number;[k: string]: unknown }
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
	| 'disabled'
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
	disabled,
}: Props) {
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
				disabled={disabled}
			/>
		</Table>
	);
}

export default RosterTable;
