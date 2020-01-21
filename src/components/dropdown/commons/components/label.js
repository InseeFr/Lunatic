import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Label = ({ content, focused, mandatory }) => (
	<div className={classnames('lunatic-dropdown-label', { focused, mandatory })}>
		{content}
	</div>
);

Label.defaultProps = {
	mandatory: false,
};

Label.propTypes = {
	content: PropTypes.string.isRequired,
	focused: PropTypes.bool.isRequired,
	mandatory: PropTypes.bool,
};

export default Label;
