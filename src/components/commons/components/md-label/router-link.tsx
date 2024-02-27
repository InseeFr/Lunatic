import type { ComponentProps } from 'react';
import { customizedComponent } from '../../../shared/HOC/customizedComponent';

type Props = Omit<ComponentProps<'a'>, 'href'> & { to: string };

const RouterLink = (props: Props) => {
	const { to, children, ...rest } = props;
	return (
		<a href={to} {...rest}>
			{children}
		</a>
	);
};

export default customizedComponent('RouterLink', RouterLink);
