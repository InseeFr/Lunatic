import React, { useCallback, useState } from 'react';
import {
	DeclarationsAfterText,
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';
import { createCustomizableLunaticField } from '../../commons';
import HandleRowButton from '../commons/handle-row-button';
import D from '../../../i18n';
import getInitLength from '../commons/get-init-length';
import { LunaticComponentProps } from '../../type';
import { Table, Tbody, Td, Tr } from '../../commons/components/html-table';
import Header from '../../table/header';
import { times } from '../../../utils/array';
import { LunaticComponents } from '../../lunatic-components';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

function RosterforLoop(props: LunaticComponentProps<'RosterForLoop'>) {
	const {
		value: valueMap,
		lines,
		handleChange,
		declarations,
		label,
		getComponents,
		executeExpression,
		headers,
		missing,
		shortcut,
		id,
		management,
		disabled,
		errors,
	} = props;
	const min = lines?.min || DEFAULT_MIN_ROWS;
	const max = lines?.max || DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(() => getInitLength(valueMap));
	const showButtons = min && max && min !== max;

	const addRow = useCallback(
		function () {
			if (nbRows < max) {
				setNbRows(nbRows + 1);
			}
		},
		[max, nbRows]
	);

	const handleChangeLoop = useCallback(
		function (
			response: { name: string },
			value: unknown,
			args: { index: number; [k: string]: unknown }
		) {
			const v = valueMap[response.name];
			v[args.index] = value;
			handleChange(response, v, { loop: true, length: nbRows }); // TODO: a retaper pour déplacer cette compléxité
		},
		[handleChange, nbRows, valueMap]
	);

	const removeRow = useCallback(
		function () {
			if (nbRows > 1) {
				const newNbRows = nbRows - 1;
				setNbRows(newNbRows);
				Object.entries(valueMap).forEach(([k, v]) => {
					const newValue = v.filter((_, i) => i < newNbRows);
					handleChange({ name: k }, newValue);
				});
			}
		},
		[nbRows, handleChange, valueMap]
	);

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
					<HandleRowButton onClick={addRow} disabled={nbRows === max}>
						{label || D.DEFAULT_BUTTON_ADD}
					</HandleRowButton>
					<HandleRowButton onClick={removeRow} disabled={nbRows === min}>
						{D.DEFAULT_BUTTON_REMOVE}
					</HandleRowButton>
				</>
			)}
		</>
	);
}

export function Row(
	props: LunaticComponentProps<'RosterForLoop'> & { row: number }
) {
	const components = props.getComponents(props.row);
	return (
		<Tr id={props.id} row={props.row}>
			<LunaticComponents
				components={components}
				componentProps={(c) => ({ ...props, ...c })}
				wrapper={({ id, children }) => (
					<Td id={`${id}-${props.row}`}>{children}</Td>
				)}
			/>
		</Tr>
	);
}

export default createCustomizableLunaticField(RosterforLoop, 'RosterforLoop');
