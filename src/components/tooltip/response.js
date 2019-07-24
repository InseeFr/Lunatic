import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as U from '../../utils/lib';
import * as img from './img';
import './tooltip.scss';

const TooltipResponse = ({ id, response }) => {
	const [tooltipElements, setTooltipElements] = useState(() =>
		U.buildTooltip(response)
	);

	useEffect(() => {
		setTooltipElements(U.buildTooltip(response));
	}, [response]);

	const { content, imgName } = tooltipElements;

	if (!content) return null;
	return (
		<div className="tooltip-lunatic">
			<img id={id} alt="img-tooltip" src={img[imgName].src || img[imgName]} />
			<span className="tooltip-text">
				<ul>
					{content.map(({ key, value }) => (
						<li key={`tooltip-${id}-content-${key}`}>{`${key} : ${value}`}</li>
					))}
				</ul>
			</span>
		</div>
	);
};

TooltipResponse.defaultProps = {
	response: {},
};

TooltipResponse.propTypes = {
	id: PropTypes.string,
	response: U.responsePropTypes,
};

export default TooltipResponse;
