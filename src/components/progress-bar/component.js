import React from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/library';
import './progress-bar.scss';

const ProgressBar = ({ id, value, style }) => {
	let controledValue = value;
	if (value < 0) controledValue = 0;
	if (value > 100) controledValue = 100;
	return (
		<div
			id={`progress-${id}`}
			className="progress-lunatic"
			style={buildStyleObject(style)}
		>
			{`${controledValue.toFixed(0)} %`}
			<span style={{ width: `${controledValue}%` }} />
		</div>
	);
};

ProgressBar.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	style: PropTypes.object,
};

export default ProgressBar;
