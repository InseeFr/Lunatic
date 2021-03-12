import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';

const Link = (props) => {
	const { href, children, title } = props;
	if (href.trim().startsWith('http'))
		return (
			<a href={href} target="_blank" rel="noreferrer noopener">
				{children}
			</a>
		);
	return (
		<span className="link-md">
			<span
				data-for={`${children}-tooltip`}
				data-tip={title}
				data-event="click focus"
				data-multiline
				className="field"
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

const renderers = {
	paragraph: (props) => <p style={{ margin: '0' }}>{props.children}</p>,
	link: Link,
};

export const interpretMD = (expression) => (
	<ReactMarkdown source={expression} renderers={renderers} />
);
