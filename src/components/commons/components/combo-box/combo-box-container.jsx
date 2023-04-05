import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function ComboBoxContainer({ children, className, id, classStyle }) {
	return (
		<div
			id={`lunatic-combo-box-container-${id}`}
			className={classnames(
				'lunatic-combo-box-container',
				className,
				classStyle
			)}
		>
			{children}
		</div>
	);
}

ComboBoxContainer.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	classStyle: PropTypes.string,
};

ComboBoxContainer.defaultProps = {
	className: undefined,
	classStyle: 'default-style',
};

export default ComboBoxContainer;
