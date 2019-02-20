import React from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import './subsequence.scss';

const Subsequence = ({ id, label, style }) => (
	<div
		aria-label={`subsequence-${id}`}
		className="subsequence-lunatic"
		style={buildStyleObject(style)}
	>
		{label}
	</div>
);

Subsequence.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	style: PropTypes.object,
};

Subsequence.defaultProps = {
	style: {},
};

export default Subsequence;
