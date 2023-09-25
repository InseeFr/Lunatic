import { useCallback, useState } from 'react';
import {
	DeclarationsAfterText,
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';
import { createCustomizableLunaticField } from '../../commons';
import { LoopButton } from '../loop-button';
import D from '../../../i18n';
import type { LunaticComponentProps } from '../../type';
import { Table, Tbody, Td, Tr } from '../../commons/components/html-table';
import Header from '../../table/header';
import { times } from '../../../utils/array';
import { LunaticComponents } from '../../lunatic-components';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

/**
 * Loop displayed as a table
 */
export const RosterForLoop = createCustomizableLunaticField<
	LunaticComponentProps<'RosterForLoop'>
>((props) => {
	const {
		value: valueMap,
		lines,
		handleChange,
		declarations,
		label,
		headers,
		iterations,
		id,
	} = props;
	const min = lines?.min || DEFAULT_MIN_ROWS;
	const max = lines?.max || DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(iterations);
	const showButtons = min && max && min !== max;

	const addRow = useCallback(() => {
		if (nbRows < max) {
			setNbRows(nbRows + 1);
		}
	}, [max, nbRows]);

	const removeRow = useCallback(() => {
		if (nbRows <= 1) {
			return;
		}
		const newNbRows = nbRows - 1;
		setNbRows(newNbRows);
		Object.entries(valueMap).forEach(([k, v]) => {
			const newValue = v.filter((_, i) => i < newNbRows);
			handleChange({ name: k }, newValue);
		});
	}, [nbRows, handleChange, valueMap]);

	if (nbRows === 0) {
		return null;
	}

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<DeclarationsAfterText declarations={declarations} id={id} />

			<Table id={id}>
				<Header header={headers} id={id} />
				<Tbody id={id}>
					{times(nbRows, (n) => (
						<Row {...props} key={n} row={n} />
					))}
				</Tbody>
			</Table>
			<DeclarationsDetachable declarations={declarations} id={id} />
			{showButtons && (
				<>
					<LoopButton onClick={addRow} disabled={nbRows === max}>
						{label || D.DEFAULT_BUTTON_ADD}
					</LoopButton>
					<LoopButton onClick={removeRow} disabled={nbRows === min}>
						{D.DEFAULT_BUTTON_REMOVE}
					</LoopButton>
				</>
			)}
		</>
	);
}, 'RosterforLoop');

function Row(props: LunaticComponentProps<'RosterForLoop'> & { row: number }) {
	const components = props.getComponents(props.row);
	return (
		<Tr id={props.id} row={props.row}>
			<LunaticComponents
				components={components}
				componentProps={(c) => ({ ...props, ...c, id: `${c.id}-${props.row}` })}
				wrapper={({ id, children }) => (
					<Td id={`${id}-${props.row}`}>{children}</Td>
				)}
			/>
		</Tr>
	);
}
