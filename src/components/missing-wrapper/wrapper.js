import React from 'react';
import Missing from './component';

const missingWrapper = (Component) => (props) => {
	const { missing } = props;
	if (missing) return <Missing Component={Component} componentProps={props} />;
	return <Component {...props} />;
};

export default missingWrapper;
