import classnames from 'classnames';
import PropTypes from 'prop-types';
import { createCustomizableLunaticField } from '../../create-customizable-field';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	className?: string;
	id?: string;
}>;

function Thead({ id, children, className }: Props) {
	return (
		<thead
			id={`lunatic-table-thead-${id}`}
			className={classnames('lunatic-table-thead', className)}
		>
			{children}
		</thead>
	);
}

export const LunaticThead = createCustomizableLunaticField(Thead, 'Thead');
