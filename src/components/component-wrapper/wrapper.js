import React from 'react';
import Missing from './missing';
import Controls from './controls';

const componentWrapper = (Component) => (props) => {
	const { missing, controls } = props;
	const hasControls = Array.isArray(controls) && controls.length > 0;
	if (missing && !hasControls)
		return <Missing Component={Component} props={props} />;
	if (!missing && hasControls)
		return <Controls Component={Component} props={props} />;
	if (missing && hasControls) {
		const ControlComponent = () => (
			<Controls Component={Component} props={props} />
		);
		return <Missing Component={ControlComponent} props={props} />;
	}
	return <Component {...props} />;
};

export default componentWrapper;
