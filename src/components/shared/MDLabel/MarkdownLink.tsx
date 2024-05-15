import { useId, type PropsWithChildren, type ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import { RouterLink } from './RouterLink';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{ href: string; tooltip?: ReactNode }>;

export const MarkdownLink = slottableComponent<Props>(
	'MarkdownLink',
	({ href, children, tooltip }) => {
		const id = useId();

		const extraProps = tooltip
			? { 'data-tooltip-id': `tooltip-${id}`, className: 'link-md' }
			: {};
		const isAbsoluteLink = href.trim().startsWith('/');

		return (
			<>
				{isAbsoluteLink ? (
					<RouterLink to={href} id={id} {...extraProps}>
						{children}
					</RouterLink>
				) : (
					<a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						id={id}
						{...extraProps}
					>
						{children}
					</a>
				)}
				{tooltip && (
					<Tooltip className="tooltip-content" id={`tooltip-${id}`}>
						{tooltip}
					</Tooltip>
				)}
			</>
		);
	}
);
