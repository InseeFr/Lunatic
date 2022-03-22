import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function Label({ content, focused, mandatory }) {
	if (!content) {
		return null;
	}
	return (
		<div
			className={classnames('lunatic-dropdown-label', { focused, mandatory })}
		>
			{content}
		</div>
	);
}

Label.defaultProps = {
	mandatory: false,
};

Label.propTypes = {
	content: PropTypes.string,
	focused: PropTypes.bool.isRequired,
	mandatory: PropTypes.bool,
};

export default Label;
