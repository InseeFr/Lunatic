import { useCallback } from 'react';
import { Tbody } from '../../commons/components/html-table';
import RosterForLoopOrchestrator from './roster-for-loop-orchestrator';
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

function Body({
	id,
	components,
	nbRows,
	executeExpression,
	handleChange,
	value: valueMap,
	missing,
	disabled,
}: Props) {
	const handleChangeRow = useCallback<Props['handleChange']>(
		function (response, value, args) {
			handleChange(response, value, { ...args, loop: true, length: nbRows });
		},
		[nbRows, handleChange]
	);

	if (nbRows <= 0) {
		return null;
	}

	return (
		<Tbody id={id}>
			<RosterForLoopOrchestrator
				id={`roster-${id}`}
				components={components}
				nbRows={nbRows}
				handleChange={handleChangeRow}
				executeExpression={executeExpression}
				valueMap={valueMap}
				missing={missing}
				preferences={['COLLECTED']}
				disabled={disabled}
			/>
		</Tbody>
	);
}

export default Body;
