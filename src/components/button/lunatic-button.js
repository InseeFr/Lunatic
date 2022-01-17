import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './button.scss';

function Button({ children, onClick, disabled }) {
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
			value={children}
			onClick={handleClick}
		/>
	);
}

// import {
// 	buildStyleObject,
// 	createObjectEvent,
// 	isFunction,
// } from '../../utils/lib';

// import { BUTTON_CATEGORY, EVENT_CLICK } from '../../constants';

// const Button = ({
// 	label,
// 	value,
// 	onClick,
// 	disabled,
// 	style,
// 	logFunction,
// 	id,
// }) => {
// 	const handleClick = useCallback(
// 		function (e) {
// 			e.stopPropagation();
// 			e.preventDefault();
// 			onClick(e);
// 			if (isFunction(logFunction))
// 				logFunction(
// 					createObjectEvent(
// 						`button-lunatic-${id}`,
// 						BUTTON_CATEGORY,
// 						EVENT_CLICK,
// 						null,
// 						label
// 					)
// 				);
// 		},
// 		[onClick, id, label, logFunction]
// 	);
// 	return (
// 		<button
// 			type="button"
// 			aria-label={label || 'button'}
// 			className="button-lunatic"
// 			style={buildStyleObject(style)}
// 			disabled={disabled}
// 			onClick={handleClick}
// 		>
// 			{value}
// 		</button>
// 	);
// };

Button.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
