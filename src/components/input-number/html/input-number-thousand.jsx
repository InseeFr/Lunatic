import classNames from 'classnames';
import React, { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import { inputNumberPropsI18N } from '../../../i18n';

const InputNumberThousand = ({
	id,
	value,
	onChange,
	disabled,
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

	const isAllowed = useCallback(
		(values) => {
			const { floatValue } = values;
			if (Number.isInteger(min) && Number.isInteger(max))
				return (
					(floatValue >= min && floatValue <= max) || floatValue === undefined
				);
			return true;
		},
		[max, min]
	);
	return (
		<NumericFormat
			id={id}
			className={classNames({ disabled })}
			onValueChange={handleChange}
			value={value ?? ''}
			labelledby={labelId}
			disabled={disabled}
			lang="en"
			isAllowed={isAllowed}
			allowedDecimalSeparators={inputNumberPropsI18N.allDecimalSeparators}
			decimalSeparator={inputNumberPropsI18N.decimalSeparator}
			decimalScale={decimals}
			allowLeadingZeros
			thousandSeparator={inputNumberPropsI18N.thousandSeparator}
			inputMode={decimals ? 'decimal' : 'numeric'}
		/>
	);
};

export default InputNumberThousand;
