import React, { useCallback } from 'react';
import classnames from 'classnames';
import './input-number.scss';

function InputNumber({
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
		<input
			className={classnames('input-lunatic', { disabled, readOnly })}
			type="number"
			onChange={handleChange}
			value={value}
			labelledby={labelId}
			readOnly={readOnly}
			disabled={disabled}
			min={min}
			max={max}
			step={step}
		/>
	);
}

export default InputNumber;
