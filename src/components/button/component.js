import React from 'react';
import PropTypes from 'prop-types';
import {
	buildStyleObject,
	createObjectEvent,
	isFunction,
} from '../../utils/lib';
import './button.scss';
import { BUTTON_CATEGORY, EVENT_CLICK } from '../../constants';

const Button = ({
	label,
	value,
	onClick,
	disabled,
	style,
	logFunction,
	id,
}) => {
	const handleClick = (e) => {
		onClick(e);
		if (isFunction(logFunction))
			logFunction(
				createObjectEvent(
					`button-lunatic-${id}`,
					BUTTON_CATEGORY,
					EVENT_CLICK,
					null,
					label
				)
			);
	};
	return (
		<button
			type="button"
			aria-label={label || 'button'}
			className="button-lunatic"
			style={buildStyleObject(style)}
			disabled={disabled}
			onClick={handleClick}
		>
			{value}
		</button>
	);
};

Button.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
