import classnames from 'classnames';
import { createCustomizableLunaticField } from '../../commons';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	className?: string;
}>;

export const ComponentSetWrapper = createCustomizableLunaticField<Props>(
	({ children }) => {
		return <div className="lunatic-component-set-component">{children}</div>;
	},
	'ComponentSetWrapper'
);
