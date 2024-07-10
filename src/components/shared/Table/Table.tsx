import React, { type PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';
import type { LunaticError } from '../../../use-lunatic/type';
import { ComponentErrors } from '../ComponentErrors/ComponentErrors';
import type { LunaticComponentProps } from '../../type';
import { Label } from '../Label/Label';
import { Declarations } from '../Declarations/Declarations';

type Props = PropsWithChildren<
	Pick<
		LunaticComponentProps<'Table'>,
		'className' | 'id' | 'label' | 'declarations'
	> & {
		errors?: LunaticError[];
	}
>;

function LunaticTable({
	id,
	className,
	children,
	errors,
	declarations,
	label,
}: Props) {
	const tableId = `table-${id}`;
	const labelId = `label-${id}`;

	return (
		<>
			<Label htmlFor={tableId} id={labelId}>
				{label}
			</Label>
			<Declarations
				type="AFTER_QUESTION_TEXT"
				declarations={declarations}
				id={id}
			/>
			<table id={tableId} className={classnames('lunatic-table', className)}>
				{children}
			</table>
			<ComponentErrors errors={errors} />
		</>
	);
}

export const Table = slottableComponent('Table', LunaticTable);
