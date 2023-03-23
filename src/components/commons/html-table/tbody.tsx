import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../create-customizable-field';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
}>;

function Tbody({ id, className, children }: Props) {
	return (
		<tbody
			id={id ? `lunatic-table-tbody-${id}` : undefined}
			className={classnames('lunatic-table-tbody', className)}
		>
			{children}
		</tbody>
	);
}

export const LunaticTbody = createCustomizableLunaticField(Tbody, 'Tbody');
