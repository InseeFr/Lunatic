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
	const valueEffective = value ?? 0;
	const handleChange = useCallback(
		function (e) {
			const val = e.target.value;
			onChange(val);
		},
		[onChange]
	);
	return (
		<input
			className={classnames('input-lunatic', { disabled, readOnly })}
			type="number"
			onChange={handleChange}
			value={valueEffective}
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
