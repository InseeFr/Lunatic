import { Fragment, useState, type PropsWithChildren } from 'react';
import { Tooltip } from 'react-tooltip';
import ReactMarkdown from 'react-markdown';
import { RouterLink } from './RouterLink';

type Props = PropsWithChildren<{ href: string; title: string }>;

export const MDLabelLink = (props: Props) => {
	const {
		href,
		children,
		title,
		// logFunction
	} = props;

	// Must be replace by useId when queen move to React 18.
	const [id] = useState(() => generateUniqueId());

	const LinkComponent: React.FC<{
		to?: string;
		href?: string;
		id: string;
		'data-tooltip-id'?: string;
	}> = (() => {
		if (href.trim().startsWith('/')) {
			return RouterLink;
		} else {
			return 'a' as any;
		}
	})();

	const linkProps = {
		...(href.trim().startsWith('/')
			? { to: href, id }
			: { href, target: '_blank', rel: 'noopener noreferrer', id }),
		...(title
			? { 'data-tooltip-id': `tooltip-${id}`, className: 'link-md' }
			: {}),
	};

	return (
		<>
			<LinkComponent {...linkProps}>{children}</LinkComponent>
			{title && (
				<Tooltip className="tooltip-content" id={`tooltip-${id}`}>
					<ReactMarkdown components={{ p: Fragment }}>{title}</ReactMarkdown>
				</Tooltip>
			)}
		</>
	);
};

export function generateUniqueId(): string {
	const timestamp = Date.now().toString(36);
	const randomPart = Math.random().toString(36).substring(2, 8);
	return `${timestamp}-${randomPart}`;
}
