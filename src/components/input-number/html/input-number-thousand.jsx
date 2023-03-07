import React, { useCallback } from 'react';

import { NumericFormat } from 'react-number-format';
import classNames from 'classnames';
import { inputNumberPropsI18N } from '../../../i18n';
import { useLunaticAutofocus } from '../../../use-lunatic/lunatic-context';

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
	const { autofocus } = useLunaticAutofocus();
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
			autoFocus={autofocus}
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
