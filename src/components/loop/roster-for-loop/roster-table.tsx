import { NothingToDisplay } from '../../commons';
import { Table, Tbody } from '../../commons/components/html-table';
import Header from '../../table/header';
import { LunaticComponentProps } from '../../type';
import RosterForLoopOrchestrator from './roster-for-loop-orchestrator';
import './roster.scss';

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
	| 'header'
	| 'value'
	| 'missing'
	| 'errors'
	| 'disabled'
	| 'getSuggesterStatus'
>;

const preferences = ['COLLECTED'] as ['COLLECTED'];

function RosterTable({
	components,
	nbRows,
	executeExpression,
	getSuggesterStatus,
	id,
	header,
	value: valueMap,
	missing,
	handleChange,
	disabled,
}: Props) {
	if (nbRows <= 0) {
		return <NothingToDisplay />;
	}
	return (
		<Table id={id} className="rosterTable">
			<Header header={header} id={id} />
			<Tbody id={id}>
				<RosterForLoopOrchestrator
					id={`roster-${id}`}
					components={components}
					nbRows={nbRows}
					handleChange={handleChange}
					executeExpression={executeExpression}
					getSuggesterStatus={getSuggesterStatus}
					valueMap={valueMap}
					missing={missing}
					preferences={preferences}
				/>
			</Tbody>
		</Table>
	);
}

export default RosterTable;
