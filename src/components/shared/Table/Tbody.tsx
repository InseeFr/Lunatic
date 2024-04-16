import type { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
}>;

function LunaticTbody({ className, children }: Props) {
	return (
		<tbody className={classnames('lunatic-table-tbody', className)}>
			{children}
		</tbody>
	);
}

export const Tbody = slottableComponent('Tbody', LunaticTbody);
