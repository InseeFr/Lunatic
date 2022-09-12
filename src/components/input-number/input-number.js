import React, { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
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
	const handleChange = useCallback(
		function ({ floatValue }) {
			if (!floatValue) onChange(null);
			else onChange(floatValue);
		},
		[onChange]
	);

	return (
		<div className="lunatic-input-number-container">
			<NumericFormat
				className={classnames('lunatic-input-number', { disabled, readOnly })}
				type="input"
				defaultValue={value ?? ''}
				thousandsGroupStyle="thousands"
				thousandSeparator=" "
				onValueChange={handleChange}
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
