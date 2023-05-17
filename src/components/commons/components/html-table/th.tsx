import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import createCustomizableLunaticField from '../../create-customizable-field';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
	row?: string | number;
	index?: string | number;
	colSpan?: number;
	rowSpan?: number;
}>;

function Th({ id, index, children, className, colSpan, rowSpan }: Props) {
	return (
		<th
			id={`lunatic-table-th-${id}-${index}`}
			className={classnames('lunatic-table-th', className)}
			colSpan={colSpan}
			rowSpan={rowSpan}
		>
			{children}
		</th>
	);
}

export const LunaticTh = createCustomizableLunaticField(Th, 'Th');
