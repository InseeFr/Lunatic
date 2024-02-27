import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { customizedComponent } from '../HOC/customizedComponent';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
}>;

function LunaticTbody({ id, className, children }: Props) {
	return (
		<tbody
			id={id ? `lunatic-table-tbody-${id}` : undefined}
			className={classnames('lunatic-table-tbody', className)}
		>
			{children}
		</tbody>
	);
}

export const Tbody = customizedComponent('Tbody', LunaticTbody);
