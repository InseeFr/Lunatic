import React, { type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
}>;

function LunaticTable({ className, id, children }: Props) {
	return (
		<table
			id={`table-${id}`}
			className={classnames('lunatic-table', className)}
		>
			{children}
		</table>
	);
}

export const Table = slottableComponent('Table', LunaticTable);
