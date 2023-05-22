import classnames from 'classnames';
import createCustomizableLunaticField from '../../create-customizable-field';
import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	row?: string | number;
	index?: string | number;
	colSpan?: number;
	rowSpan?: number;
}>;

function Td({ id, children, row, index, className, colSpan, rowSpan }: Props) {
	return (
		<td
			id={`lunatic-table-td-${id}-${row}-${index}`}
			className={classnames('lunatic-table-td', className)}
			colSpan={colSpan}
			rowSpan={rowSpan}
		>
			{children}
		</td>
	);
}

export const LunaticTd = createCustomizableLunaticField(Td, 'Td');
