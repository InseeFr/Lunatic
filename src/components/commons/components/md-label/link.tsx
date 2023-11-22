import { Fragment, type PropsWithChildren, useId } from 'react';
import { Tooltip } from 'react-tooltip';
import ReactMarkdown from 'react-markdown';
import RouterLink from './router-link';

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

export default Link;
