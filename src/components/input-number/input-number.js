import React, { useCallback } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../commons';
import './input-number.scss';

function InputNumber({
	id,
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
	const handleChange = useCallback(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(isNaN(val) ? null : val);
		},
		[onChange]
	);
	return (
		<div className="lunatic-input-number-container">
			<input
				id={id}
				className={classnames('lunatic-input-number', { disabled, readOnly })}
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
			{unit && <span>{unit}</span>}
		</div>
	);
}

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
