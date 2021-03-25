import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
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

	const text = content
		.map(({ key, value }) => `${key} : ${value}<br />`)
		.join('');

	return (
		<div className="tooltip-lunatic">
			<span
				data-for={`${id}-management-tooltip`}
				data-tip={text}
				data-multiline
			>
				<img id={id} alt="img-tooltip" src={img[imgName].src || img[imgName]} />
			</span>
			<ReactTooltip
				id={`${id}-management-tooltip`}
				className="tooltip-text"
				place="left"
			/>
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
