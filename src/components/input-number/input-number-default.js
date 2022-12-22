import classNames from 'classnames';
import React, { useCallback } from 'react';

const InputNumberDefault = ({
	id,
	value,
	onChange,
	disabled,
	readOnly,
	labelId,
	min,
	max,
	step,
}) => {
	const handleChange = useCallback(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(isNaN(val) ? null : val);
		},
		[onChange]
	);
	return (
		<input
			id={id}
			className={classNames('lunatic-input-number', { disabled, readOnly })}
			type="number"
			onChange={handleChange}
			value={value ?? ''}
			labelledby={labelId}
			readOnly={readOnly}
			disabled={disabled}
			min={min}
			max={max}
			step={step}
			lang="en"
		/>
	);
};

export default InputNumberDefault;
