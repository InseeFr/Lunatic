import React, { useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './button.scss';

function Button({ children, onClick, disabled, label, className }) {
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
			className={classnames('button-lunatic', className, { disabled })}
			value={label || children}
			onClick={handleClick}
		/>
	);
}

Button.propTypes = {
<<<<<<< HEAD
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
=======
>>>>>>> 49f5e5f6ee969ff0745f5447540dc837bc4b0447
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
