import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	className?: string;
}>;

function ComponentSetComponentContainer({ children, className }: Props) {
	return (
		<div className={classnames('lunatic-component-set-component', className)}>
			{children}
		</div>
	);
}

export default createCustomizableLunaticField(
	ComponentSetComponentContainer,
	'ComponentSetComponentContainer'
);
