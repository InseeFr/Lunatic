import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
	row?: string | number;
	index?: string | number;
	colSpan?: number;
	rowSpan?: number;
}>;

function LunaticTh({ index, children, className, colSpan, rowSpan }: Props) {
	return (
		<th
			className={classnames('lunatic-table-th', className)}
			colSpan={colSpan}
			rowSpan={rowSpan}
		>
			{children}
		</th>
	);
}

export const Th = slottableComponent('Th', LunaticTh);
