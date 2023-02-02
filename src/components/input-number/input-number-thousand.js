import classNames from 'classnames';
import React, { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import { inputNumberPropsI18N } from '../../i18n';

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
			allowedDecimalSeparators={inputNumberPropsI18N.allDecimalSeparators}
			decimalSeparator={inputNumberPropsI18N.decimalSeparator}
			decimalScale={decimals}
			allowLeadingZeros
			thousandSeparator={inputNumberPropsI18N.thousandSeparator}
		/>
	);
};

export default InputNumberThousand;
