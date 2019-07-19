import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { responsePropTypes } from '../../utils';
import * as img from './img';
import { buildTooltip } from '../../utils/tooltip';
import './tooltip.scss';

const TooltipResponse = ({ id, response }) => {
	const [tooltipElements, setTooltipElements] = useState(
		buildTooltip(response)
	);
	const { content, imgName } = tooltipElements;

	useEffect(() => {
		setTooltipElements(buildTooltip(response));
	}, [response]);

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
	response: responsePropTypes,
};

export default TooltipResponse;
