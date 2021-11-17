import React from 'react';
import Missing from './missing';

const componentWrapper = (Component) => (props) => {
	const { missing } = props;
	if (missing) return <Missing Component={Component} props={props} />;
	return <Component {...props} />;
};

export default componentWrapper;
