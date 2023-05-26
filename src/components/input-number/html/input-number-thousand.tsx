import classNames from 'classnames';
import { useCallback } from 'react';
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
			if (Number.isInteger(max) && floatValue && max)
				return floatValue <= max || false;
			return true;
		},
		[max]
	);
	return (
		<NumericFormat
			id={id}
			className={classNames({ disabled })}
			onValueChange={handleChange}
			value={value ?? ''}
			min={min}
			max={max}
			aria-labelledby={labelId}
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
