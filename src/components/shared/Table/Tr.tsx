import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../HOC/customizedComponent';

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

export const Tr = customizedComponent('Tr', LunaticTr);
