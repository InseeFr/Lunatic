import React, { useCallback } from 'react';
import classnames from 'classnames';

function checkValue(value) {
	return value || '';
}

function Input({
	value,
	onChange,
	disabled,
	required,
	maxLength,
	id,
	labelledBy,
}) {
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);
	return (
		<input
			id={id}
			aria-labelledby={labelledBy}
			autoComplete="off"
			type="text"
			disabled={disabled}
			className={classnames('input-lunatic')}
			value={checkValue(value)}
			onChange={handleChange}
			aria-required={required}
			required={required}
			maxLength={maxLength}
		/>
	);
}

Input.defaultProps = {
	disabled: false,
	required: true,
	maxLength: Number.MAX_SAFE_INTEGER,
};

export default Input;
