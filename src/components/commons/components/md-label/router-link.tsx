import type { ComponentProps } from 'react';
import createCustomizableLunaticField from '../../create-customizable-field';

type Props = Omit<ComponentProps<'a'>, 'href'> & { to: string };

const RouterLink = (props: Props) => {
	const { to, children, onClick, ref, ...rest } = props;
	return (
		<a href={to} onClick={onClick} ref={ref} {...rest}>
			{children}
		</a>
	);
};

export default createCustomizableLunaticField(RouterLink, 'RouterLink');
