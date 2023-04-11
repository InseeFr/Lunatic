import classNames from 'classnames';
import React, { useCallback } from 'react';
import {
	NumberFormatValues,
	NumericFormat,
	OnValueChange,
} from 'react-number-format';
import { inputNumberPropsI18N } from '../../../i18n';

type Props = {
	id?: string;
	onChange: (n: number | null) => void;
	value?: number | null;
	disabled?: boolean;
	required?: boolean;
	labelId?: string;
	min?: number;
	max?: number;
	decimals?: number;
};

const InputNumberThousand = ({
	id,
	value,
	onChange,
	disabled,
	labelId,
	min,
	max,
	decimals,
}: Props) => {
	const handleChange = useCallback<OnValueChange>(
		function (e) {
			const val = e.floatValue ?? null;
			onChange(Number.isNaN(val) ? null : val);
		},
		[onChange]
	);

	const isAllowed = useCallback(
		(values: NumberFormatValues) => {
			const { floatValue } = values;
			if (
				Number.isInteger(min) &&
				Number.isInteger(max) &&
				floatValue &&
				min &&
				max
			)
				return (floatValue >= min && floatValue <= max) || false;
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
			aria-labbeledby={labelId}
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