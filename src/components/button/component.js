import React from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/lib';
import './button.scss';

const Button = ({ label, value, onClick, disabled, style }) => (
	<button
		type="button"
		aria-label={label || 'button'}
		className="button-lunatic"
		style={buildStyleObject(style)}
		disabled={disabled}
		onClick={onClick}
	>
		{value}
	</button>
);

Button.propTypes = {
	value: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
