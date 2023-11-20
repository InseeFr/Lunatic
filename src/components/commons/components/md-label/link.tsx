import { Fragment, type PropsWithChildren, useId } from 'react';
import { Tooltip } from 'react-tooltip';
import ReactMarkdown from 'react-markdown';
import routerLink from './router-link';

type Props = PropsWithChildren<{ href: string; title: string }>;
const Link = (props: Props) => {
	const {
		href,
		children,
		title,
		// logFunction
	} = props;

	const id = useId();

	const LinkComponent: React.FC<{
		to?: string;
		href?: string;
		id: string;
		'data-tooltip-id'?: string;
	}> = (() => {
		if (href.trim().startsWith('/')) {
			return routerLink;
		} else {
			return 'a' as any;
		}
	})();

	const linkProps = href.trim().startsWith('/')
		? { to: href, id }
		: { href, target: '_blank', rel: 'noopener noreferrer', id };

	return (
		<>
			<LinkComponent
				{...linkProps}
				{...(title
					? { 'data-tooltip-id': `tooltip-${id}`, className: 'link-md' }
					: {})}
			>
				{children}
			</LinkComponent>
			{title && (
				<Tooltip className="tooltip-content" id={`tooltip-${id}`}>
					<ReactMarkdown components={{ p: Fragment }}>{title}</ReactMarkdown>
				</Tooltip>
			)}
		</>
	);
};

export default Link;
