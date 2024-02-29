import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
}>;

function LunaticThead({ id, children, className }: Props) {
	return (
		<thead
			id={`lunatic-table-thead-${id}`}
			className={classnames('lunatic-table-thead', className)}
		>
			{children}
		</thead>
	);
}

export const Thead = slottableComponent('Thead', LunaticThead);
