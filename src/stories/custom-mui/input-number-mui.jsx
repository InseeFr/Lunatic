import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';

function InputNumberMui({
	value,
	onChange,
	disabled,
	readOnly,
	labelId,
	min,
	max,
	step,
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
			type="number"
			onChange={handleChange}
			value={value}
			disabled={disabled}
			aria-labelledby={labelId}
			min={min}
			max={max}
			step={step}
			readOnly={readOnly}
		/>
	);
}

export default InputNumberMui;
