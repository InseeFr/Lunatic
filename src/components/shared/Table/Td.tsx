import classnames from 'classnames';
import type { PropsWithChildren } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
	row?: string | number;
	index?: string | number;
	colSpan?: number;
	rowSpan?: number;
}>;

function LunaticTd({
	children,
	row,
	index,
	className,
	colSpan,
	rowSpan,
}: Props) {
	return (
		<td
			className={classnames('lunatic-table-td', className)}
			colSpan={colSpan}
			rowSpan={rowSpan}
		>
			{children}
		</td>
	);
}

export const Td = slottableComponent('Td', LunaticTd);
