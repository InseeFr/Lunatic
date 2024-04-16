import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
}>;

function LunaticThead({ children, className }: Props) {
	return (
		<thead className={classnames('lunatic-table-thead', className)}>
			{children}
		</thead>
	);
}

export const Thead = slottableComponent('Thead', LunaticThead);
