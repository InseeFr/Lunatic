import React, { PropsWithChildren } from 'react';
import ReactTooltip from 'react-tooltip';

type Props = PropsWithChildren<{ href: string; title: string }>;

const Link = (props: Props) => {
	const {
		href,
		children,
		title,
		// logFunction
	} = props;
	// TODO: reactivate
	const listener = (/* link = true */) => () => {
		// if (isFunction(logFunction))
		// 	logFunction(
		// 		createObjectEvent(
		// 			link ? `link-${href}` : `tooltip-${title}`,
		// 			link ? LINK_CATEGORY : TOOLTIP_CATEGORY,
		// 			EVENT_CLICK
		// 		)
		// 	);
	};
	if (href.trim().startsWith('http'))
		return (
			<a
				href={href}
				target="_blank"
				rel="noreferrer noopener"
				onClick={listener()}
			>
				{children}
			</a>
		);
	return (
		<span className="link-md" onPointerUp={listener(/*false*/)}>
			<span
				data-for={`${title}-tooltip`}
				data-tip={title}
				data-multiline
				className="field-md"
			>
				{children}
			</span>
			<ReactTooltip
				id={`${title}-tooltip`}
				className="tooltip-content"
				place="bottom"
				effect="solid"
				globalEventOff="click"
			/>
		</span>
	);
};

export default Link;
