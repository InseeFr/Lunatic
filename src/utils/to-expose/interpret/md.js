import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';
import {
	EVENT_CLICK,
	LINK_CATEGORY,
	TOOLTIP_CATEGORY,
} from '../../../constants';
import { createObjectEvent, isFunction } from '../../lib';

const Link = (props) => {
	const { href, children, title, logFunction } = props;
	const listener =
		(link = true) =>
		() => {
			if (isFunction(logFunction))
				logFunction(
					createObjectEvent(
						link ? `link-${href}` : `tooltip-${title}`,
						link ? LINK_CATEGORY : TOOLTIP_CATEGORY,
						EVENT_CLICK
					)
				);
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
		<span className="link-md" onPointerUp={listener(false)}>
			<span
				data-for={`${children}-tooltip`}
				data-tip={title}
				data-event="click focus"
				data-multiline
				className="field-md"
			>
				{children}
			</span>
			<ReactTooltip
				id={`${children}-tooltip`}
				className="tooltip-content"
				place="bottom"
				effect="solid"
				globalEventOff="click"
			/>
		</span>
	);
};

const renderers = (otherProps) => {
	return {
		paragraph: (props) => <p style={{ margin: '0' }}>{props.children}</p>,
		link: (props) => Link({ ...otherProps, ...props }),
	};
};

export const interpretMD = (expression) => (logFunction) =>
	<ReactMarkdown source={expression} renderers={renderers({ logFunction })} />;
