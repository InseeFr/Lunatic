import { Fragment, useCallback, useState } from 'react';
import './RosterForLoop.scss';
import D from '../../i18n';
import type { LunaticComponentProps } from '../type';
import { Table, Tbody, Td, Tr, TableHeader } from '../shared/Table';
import { times } from '../../utils/array';
import { LunaticComponents } from '../LunaticComponents';
import { blockedInLoopComponents } from '../Loop/constant';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { Label } from '../shared/Label/Label';
import { Button } from '../shared/Button/Button';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

/**
 * Loop displayed as a table
 */
export const RosterForLoop = customizedComponent<
	LunaticComponentProps<'RosterForLoop'>
>('RosterforLoop', (props) => {
	const {
		value: valueMap,
		lines,
		handleChange,
		declarations,
		header,
		iterations,
		id,
		getComponents,
		label,
		...otherProps // These props will be passed down to the child components
	} = props;
	const min = lines?.min || DEFAULT_MIN_ROWS;
	const max = lines?.max || DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(Math.max(min, iterations));
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
			<Label htmlFor={id} id={`label-${id}`}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<Table id={id}>
				{header && <TableHeader header={header} id={id} />}
				<Tbody id={id}>
					{times(nbRows, (n) => {
						const components = getComponents(n);
						const lineErrors = getComponentErrors(props.errors, `${id}-${n}`);
						const hasLineErrors = !!lineErrors?.length;
						cols = components.length;
						return (
							<Fragment key={n}>
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
										memo
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
											<ComponentErrors errors={lineErrors} />
										</td>
									</tr>
								)}
							</Fragment>
						);
					})}
				</Tbody>
			</Table>
			<ComponentErrors errors={props.errors} componentId={id} />
			{showButtons && (
				<>
					<Button onClick={addRow} disabled={nbRows === max}>
						{D.DEFAULT_BUTTON_ADD}
					</Button>
					<Button onClick={removeRow} disabled={nbRows === min}>
						{D.DEFAULT_BUTTON_REMOVE}
					</Button>
				</>
			)}
		</>
	);
});
