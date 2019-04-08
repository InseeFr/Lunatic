import React from 'react';
import WithNestedOption from './simple-select-nested.component';
import WithList from './simple-select-list.component';

export default ({ options, ...rest }) =>
	options ? (
		<WithList options={options} {...rest} />
	) : (
		<WithNestedOption {...rest} />
	);
