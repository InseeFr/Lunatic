import React from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import './sequence.scss';

const Sequence = ({ id, label, style }) => (
	<div
		aria-label={`sequence-${id}`}
		className="sequence-lunatic"
		style={buildStyleObject(style)}
	>
		{label}
	</div>
);

Sequence.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	style: PropTypes.object,
};

Sequence.defaultProps = {
	style: {},
};

export default Sequence;
