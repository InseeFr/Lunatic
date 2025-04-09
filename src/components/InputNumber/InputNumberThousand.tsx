import classNames from 'classnames';
import { useCallback } from 'react';
import {
	NumericFormat,
	type NumberFormatValues,
	type OnValueChange,
} from 'react-number-format';
import { inputNumberPropsI18N } from '../../i18n';

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
	invalid?: boolean;
	unit?: string;
};

export const InputNumberThousand = ({
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
	invalid,
	unit,
}: Props) => {
	const handleChange = useCallback<OnValueChange>(
		function (e) {
			const val = e.floatValue ?? null;
			onChange(Number.isNaN(val) ? null : val);
		},
		[onChange]
	);

	const isAllowed = useCallback(
		(values: NumberFormatValues) =>
			isNumberValueAllowed(values.floatValue, min, max),
		[min, max]
	);

	// we want to display the user input and its unit on hover
	let title;
	if (value !== undefined && value !== null) {
		const unitTitle = unit ? ` ${unit}` : '';
		title = `${value.toLocaleString()}${unitTitle}`;
	}

	return (
		<NumericFormat
			id={id}
			className={classNames({ disabled })}
			onValueChange={handleChange}
			value={value ?? ''}
			title={title}
			aria-labelledby={labelId}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			lang="en"
			isAllowed={isAllowed}
			allowNegative={min === undefined || min < 0}
			allowedDecimalSeparators={inputNumberPropsI18N.allDecimalSeparators}
			decimalSeparator={inputNumberPropsI18N.decimalSeparator}
			decimalScale={decimals}
			allowLeadingZeros
			thousandSeparator={inputNumberPropsI18N.thousandSeparator}
			inputMode={decimals ? 'decimal' : 'numeric'}
			aria-invalid={invalid}
			onBlur={(e) => {
				e.target.setSelectionRange(0, 0);
			}}
		/>
	);
};

/** Check if the input value is allowed */
export function isNumberValueAllowed(
	value?: number,
	min?: number,
	max?: number
): boolean {
	// we accept undefined value
	if (value === undefined) return true;

	// check if value is in within the min-max range
	if (
		(min !== undefined && value < min) ||
		(max !== undefined && value > max)
	) {
		return false;
	}

	return true;
}
