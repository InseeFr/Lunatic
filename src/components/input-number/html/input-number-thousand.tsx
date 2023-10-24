import classNames from 'classnames';
import { useCallback, useState } from 'react';
import {
	type NumberFormatValues,
	NumericFormat,
	type OnValueChange,
} from 'react-number-format';
import { inputNumberPropsI18N } from '../../../i18n';

type Props = {
	id?: string;
	onChange: (n: number | null) => void;
	value?: number | null;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	labelId?: string;
	min?: number;
	max?: number;
	decimals?: number;
};

const InputNumberThousand = ({
	id,
	onChange,
	value,
	disabled,
	readOnly,
	required,
	labelId,
	min,
	max,
	decimals,
}: Props) => {
	// Decimals is a number indicates the number behind the separator of decimals
	// Computing step attribute of input according to decimal number
	const [step] = useState(decimals ? 1 / Math.pow(10, decimals) : 1);

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
			aria-labelledby={labelId}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
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
