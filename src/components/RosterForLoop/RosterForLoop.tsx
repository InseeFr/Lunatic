import { Fragment, useCallback, useState } from 'react';
import type { LunaticComponentProps } from '../type';
import { Table, Tbody, Td, Tr, TableHeader } from '../shared/Table';
import { times } from '../../utils/array';
import { LunaticComponents } from '../LunaticComponents';
import { blockedInLoopComponents } from '../Loop/constant';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { CustomLoop } from '../Loop/Loop';
import { objectMap } from '../../utils/object';

const DEFAULT_MIN_ROWS = 1;
const DEFAULT_MAX_ROWS = 12;

/**
 * Loop displayed as a table
 */
export const RosterForLoop = (
	props: LunaticComponentProps<'RosterForLoop'>
) => {
	const {
		value: valueMap,
		lines,
		errors,
		handleChanges,
		declarations,
		header,
		iterations,
		id,
		getComponents,
		label,
		...otherProps // These props will be passed down to the child components
	} = props;
	const min = lines?.min ?? DEFAULT_MIN_ROWS;
	const max = lines?.max ?? DEFAULT_MAX_ROWS;
	const [nbRows, setNbRows] = useState(Math.max(min, iterations));

	const addRow = useCallback(() => {
		if (nbRows < max) {
			setNbRows(nbRows + 1);
		}
	}, [max, nbRows]);

	const removeRow = useCallback(() => {
		if (nbRows <= min) {
			return;
		}
		const newNbRows = nbRows - 1;
		setNbRows(newNbRows);
		// Downsize all variables by 1
		const newResponses = Object.entries(valueMap).map(([k, v]) => {
			return {
				name: k,
				value: v?.filter((_, i) => i < newNbRows),
			};
		});
		handleChanges(newResponses);
	}, [nbRows, min, valueMap, handleChanges]);

	if (nbRows === 0) {
		return null;
	}

	let cols = 0;

	return (
		<CustomLoop
			{...props}
			errors={getComponentErrors(errors, props.id)}
			addRow={nbRows === max ? undefined : addRow}
			removeRow={nbRows === min ? undefined : removeRow}
			canControlRows={!!(min && max && min !== max)}
		>
			<Table id={id}>
				{header && <TableHeader header={header} />}
				<Tbody>
					{times(nbRows, (n) => {
						const components = getComponents(n);
						const lineErrors = getComponentErrors(props.errors, `${id}-${n}`);
						const hasLineErrors = !!lineErrors?.length;
						cols = components.length;
						return (
							<Fragment key={n}>
								<Tr
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
											errors,
										})}
										wrapper={({ children }) => <Td>{children}</Td>}
									/>
								</Tr>
								{hasLineErrors && (
									<Tr className="lunatic-errors">
										<Td colSpan={cols}>
											<ComponentErrors errors={lineErrors} />
										</Td>
									</Tr>
								)}
							</Fragment>
						);
					})}
				</Tbody>
			</Table>
		</CustomLoop>
	);
};
