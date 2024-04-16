import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
	row?: string | number;
}>;

function LunaticTr({ children, className, row }: Props) {
	return (
		<tr className={classnames('lunatic-table-tr', className)}>{children}</tr>
	);
}

export const Tr = slottableComponent('Tr', LunaticTr);
