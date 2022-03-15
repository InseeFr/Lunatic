import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './button.scss';

function Button({ children, onClick, disabled, label }) {
	const handleClick = useCallback(
		function (e) {
			e.stopPropagation();
			e.preventDefault();
			onClick(e);
		},
		[onClick]
	);

	return (
		<input
			disabled={disabled}
			type="button"
			className="button-lunatic"
			value={label || children}
			onClick={handleClick}
		/>
	);
}

Button.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
