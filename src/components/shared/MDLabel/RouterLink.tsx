import type { ComponentProps } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = Omit<ComponentProps<'a'>, 'href'> & { to: string };

export const RouterLink = slottableComponent('RouterLink', (props: Props) => {
	const { to, children, ...rest } = props;
	return (
		<a href={to} {...rest}>
			{children}
		</a>
	);
});
