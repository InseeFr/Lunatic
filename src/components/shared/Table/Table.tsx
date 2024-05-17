import React, { type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';
import type { LunaticError } from '../../../use-lunatic/type';
import { ComponentErrors } from '../ComponentErrors/ComponentErrors';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	errors?: LunaticError[];
}>;

function LunaticTable({ id, className, children, errors }: Props) {
	return (
		<>
			<table
				id={`table-${id}`}
				className={classnames('lunatic-table', className)}
			>
				{children}
			</table>
			<ComponentErrors errors={errors} />
		</>
	);
}

export const Table = slottableComponent('Table', LunaticTable);
