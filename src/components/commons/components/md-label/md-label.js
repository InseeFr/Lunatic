import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from './link';

const renderers = (otherProps) => {
	return {
		p: (props) => <p style={{ margin: '0' }}>{props.children}</p>,
		a: (props) => Link({ ...otherProps, ...props }),
	};
};

const DEFAULT_LOG_FUNCTION = () => {};

const MdLabel = ({ expression, logFunction = DEFAULT_LOG_FUNCTION }) => (
	<ReactMarkdown
		children={expression}
		components={renderers({ logFunction })}
	/>
);

export default MdLabel;
