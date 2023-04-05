import React, { useCallback } from 'react';
import classnames from 'classnames';
import TextField from '@mui/material/TextField';

function checkValue(value) {
	return value || '';
}

function InputMui({
	value,
	onChange,
	disabled,
	required,
	maxLength,
	id,
	labelledBy,
	readOnly,
}) {
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);
	return (
		<TextField
			id={`lunatic-mui-${id}`}
			aria-labelledby={labelledBy}
			autoComplete="off"
			type="text"
			disabled={disabled}
			className={classnames('lunatic-mui-input')}
			value={checkValue(value)}
			onChange={handleChange}
			aria-required={required}
			required={required}
			maxLength={maxLength}
			readOnly={readOnly}
		/>
	);
}

InputMui.defaultProps = {
	disabled: false,
	required: true,
	maxLength: Number.MAX_SAFE_INTEGER,
};

export default InputMui;
