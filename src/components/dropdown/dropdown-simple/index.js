import React from 'react';
import Dropdown from './dropdown';

const childrenToOption = (children = []) =>
	(Array.isArray(children) ? children : [children]).map(child => {
		const { value } = child.props;
		const label = child.props.children;
		if (label === undefined || value === undefined) {
			throw new Error('Ooops');
		}
		return { label, value };
	});

const createDropdown = Component => ({ children, options, ...props }) => {
	const o = options || childrenToOption(children);
	return <Component options={o} {...props} />;
};

export default createDropdown(Dropdown);
export { default as Option } from './option';
