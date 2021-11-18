import React from 'react';
import Missing from './missing';
import Controls from './controls';

const componentWrapper = (Component) => (props) => {
	const { missing, controls, componentType } = props;
	const hasC = hasControls(controls, componentType);
	if (missing && !hasC) return <Missing Component={Component} props={props} />;
	if (!missing && hasC) return <Controls Component={Component} props={props} />;
	if (missing && hasC) {
		const ControlComponent = () => (
			<Controls Component={Component} props={props} />
		);
		return <Missing Component={ControlComponent} props={props} />;
	}
	return <Component {...props} />;
};

const hasControls = (controls, componentType) =>
	(Array.isArray(controls) && controls.length > 0) ||
	['InputNumber', 'Datepicker'].includes(componentType);

export default componentWrapper;
