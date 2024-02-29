import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	row?: string | number;
}>;

function LunaticTr({ id, children, className, row }: Props) {
	return (
		<tr
			id={`lunatic-table-tr-${id}-${row}`}
			className={classnames('lunatic-table-tr', className)}
		>
			{children}
		</tr>
	);
}

export const Tr = slottableComponent('Tr', LunaticTr);
