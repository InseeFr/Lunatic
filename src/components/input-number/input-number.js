import React, { useCallback } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../commons';
import './input-number.scss';

const regex = /[0-9]|e|E|,|\./;

const handleKeyPress = function (e) {
	if (!regex.test(e.key)) e.preventDefault();
};

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
	const handleChange = useCallback(
		function (e) {
			if (e.target.value === '') onChange(null);
			const val = e.target.valueAsNumber;
			if (isNaN(val)) e.preventDefault();
			else onChange(val);
		},
		[onChange]
	);

	return (
		<div className="lunatic-input-number-container">
			<input
				className={classnames('lunatic-input-number', { disabled, readOnly })}
				type="number"
				onChange={handleChange}
				onKeyPress={handleKeyPress}
				value={value ?? ''}
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
