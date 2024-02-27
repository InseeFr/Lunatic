import classnames from 'classnames';
import { type PropsWithChildren } from 'react';
import { customizedComponent } from '../HOC/customizedComponent';

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

export const Thead = customizedComponent('Thead', LunaticThead);
