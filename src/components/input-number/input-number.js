import React, { useCallback } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../commons';
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
	unit,
}) {
	const valueEffective = value ?? '';
	const handleChange = useCallback(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(val);
		},
		[onChange]
	);
	return (
		<div className="lunatic-input-number-container">
			<input
				className={classnames('lunatic-input-number', { disabled, readOnly })}
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
			{unit && <span>{unit}</span>}
		</div>
	);
}

export default createCustomizableLunaticField(InputNumber);
