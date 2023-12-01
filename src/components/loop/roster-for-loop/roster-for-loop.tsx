import { useCallback, useState } from 'react';
import './roster.scss';
import {
	DeclarationsAfterText,
	DeclarationsBeforeText,
	DeclarationsDetachable,
} from '../../declarations';
import { createCustomizableLunaticField, Errors } from '../../commons';
import { LoopButton } from '../loop-button';
import D from '../../../i18n';
import type { LunaticComponentProps } from '../../type';
import { Table, Tbody, Td, Tr } from '../../commons/components/html-table';
import { TableHeader } from '../../table/table-header';
import { times } from '../../../utils/array';
import { LunaticComponents } from '../../lunatic-components';
import { blockedInLoopComponents } from '../constant';
import { getComponentErrors } from '../../commons/components/errors/errors';

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
		getComponents,
		...otherProps // These props will be passed down to the child components
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

	let cols = 0;

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<DeclarationsAfterText declarations={declarations} id={id} />
			<Table id={id}>
				<TableHeader header={headers} id={id} />
				<Tbody id={id}>
					{times(nbRows, (n) => {
						const components = getComponents(n);
						const lineErrors = getComponentErrors(props.errors, `${id}-${n}`);
						const hasLineErrors = !!lineErrors?.length;
						cols = components.length;
						return (
							<>
								<Tr
									id={props.id}
									row={n}
									key={n}
									className={
										hasLineErrors ? 'lunatic-row-has-error' : undefined
									}
								>
									<LunaticComponents
										blocklist={blockedInLoopComponents}
										components={components}
										componentProps={(c) => ({
											...otherProps,
											...c,
											id: `${c.id}-${n}`,
										})}
										wrapper={({ id, children }) => (
											<Td id={`${id}-${n}`}>{children}</Td>
										)}
									/>
								</Tr>
								{hasLineErrors && (
									<tr className="lunatic-errors">
										<td colSpan={cols}>
											<Errors errors={lineErrors} />
										</td>
									</tr>
								)}
							</>
						);
					})}
				</Tbody>
			</Table>
			<Errors errors={getComponentErrors(props.errors, id)} />
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
