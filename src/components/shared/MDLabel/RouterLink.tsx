import type { ComponentProps } from 'react';
import { customizedComponent } from '../HOC/customizedComponent';

type Props = Omit<ComponentProps<'a'>, 'href'> & { to: string };

export const RouterLink = customizedComponent('RouterLink', (props: Props) => {
	const { to, children, ...rest } = props;
	return (
		<a href={to} {...rest}>
			{children}
		</a>
	);
});
