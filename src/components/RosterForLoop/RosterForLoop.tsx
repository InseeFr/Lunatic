import { Fragment, useRef } from 'react';
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
import { useLoopUtils } from '../Loop/utils';
import { useAutoFocusRow } from '../../hooks/use-auto-focus';

/**
 * Loop displayed as a table
 */
export const RosterForLoop = (
	props: LunaticComponentProps<'RosterForLoop'>
) => {
	const { min, max, nbRows, addRow, removeRow, focusKey } = useLoopUtils(props);

	const containerRef = useRef<HTMLDivElement>(null);
	useAutoFocusRow(containerRef, focusKey);
	const {
		errors,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		declarations,
		header,
		id,
		getComponents,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		label,
		...otherProps // These props will be passed down to the child components
	} = props;

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
			containerRef={containerRef}
			focusKey={focusKey}
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
									data-focus-key={`row-${n}`}
								>
									<LunaticComponents
										blocklist={blockedInLoopComponents}
										components={components}
										memo
										componentProps={(c) => ({
											...otherProps,
											...c,
											id: `${c.id}-${n}`,
											iteration: n,
											errors,
										})}
										wrapper={(props) => <Td {...props} />}
									/>
								</Tr>
								{hasLineErrors && (
									<Tr className="lunatic-errors">
										{/* @ts-expect-error colSpan is not resolved */}
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
