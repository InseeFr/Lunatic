import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../create-customizable-field';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	row?: string | number;
}>;

function Tr({ id, children, className, row }: Props) {
	return (
		<tr
			id={`lunatic-table-tr-${id}-${row}`}
			className={classnames('lunatic-table-tr', className)}
		>
			{children}
		</tr>
	);
}

export const LunaticTr = createCustomizableLunaticField(Tr, 'Tr');
