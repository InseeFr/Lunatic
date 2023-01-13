import classNames from 'classnames';
import React, { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';

const InputNumberThousand = ({
	id,
	value,
	onChange,
	disabled,
	readOnly,
	labelId,
	min,
	max,
	decimals,
	thousandSeparator,
}) => {
	const handleChange = useCallback(
		function (e) {
			const val = e.floatValue;
			onChange(isNaN(val) ? null : val);
		},
		[onChange]
	);
	return (
		<NumericFormat
			id={id}
			className={classNames('lunatic-input-number', { disabled, readOnly })}
			onValueChange={handleChange}
			value={value ?? ''}
			labelledby={labelId}
			readOnly={readOnly}
			disabled={disabled}
			lang="en"
			isAllowed={(values) => {
				const { floatValue } = values;
				return (
					(floatValue >= min && floatValue <= max) || floatValue === undefined
				);
			}}
			allowedDecimalSeparators={['.', ',']}
			decimalScale={decimals}
			allowLeadingZeros
			thousandSeparator={thousandSeparator}
		/>
	);
};

export default InputNumberThousand;
