import classnames from 'classnames';
import type { PropsWithChildren } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';
import type { LunaticComponentProps } from '../../type';

type Props = PropsWithChildren<
	{
		className?: string;
		row?: string | number;
		index?: string | number;
		colSpan?: number;
		rowSpan?: number;
	} & LunaticComponentProps
>;

function LunaticTd({ children, className, colSpan, rowSpan }: Props) {
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
