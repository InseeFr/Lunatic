import { useState, type PropsWithChildren, type ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import { RouterLink } from './RouterLink';
import { slottableComponent } from '../HOC/slottableComponent';

type Props = PropsWithChildren<{ href: string; tooltip?: ReactNode }>;

export const MarkdownLink = slottableComponent<Props>(
	'MarkdownLink',
	({ href, children, tooltip }) => {
		// Must be replace by useId when queen move to React 18.
		const [id] = useState(() => generateUniqueId());

		const extraProps = tooltip
			? { 'data-tooltip-id': `tooltip-${id}`, className: 'link-md' }
			: {};
		const isAbsoluteLink = href.trim().startsWith('/');

		return (
			<>
				{isAbsoluteLink ? (
					<a href={href} target="_blank" rel="noopener noreferrer" id={id}>
						{children}
					</a>
				) : (
					<RouterLink to={href} id={id} {...extraProps}>
						{children}
					</RouterLink>
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

export function generateUniqueId(): string {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 8);
	return `${timestamp}-${randomPart}`;
}
