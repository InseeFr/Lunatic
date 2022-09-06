import React, { useCallback } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField } from '../commons';

function checkValue(value) {
	return value ?? '';
}

function Input({
	value,
	onChange,
	disabled,
	required,
	maxLength,
	id,
	labelledBy,
}) {
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);
	return (
		<input
			id={id}
			labelledbby={labelledBy}
			autoComplete="off"
			type="text"
			disabled={disabled}
			className={classnames('lunatic-input')}
			value={checkValue(value)}
			onChange={handleChange}
			aria-required={required}
			required={required}
			maxLength={maxLength}
		/>
	);
}

Input.defaultProps = {
	disabled: false,
	required: true,
	maxLength: Number.MAX_SAFE_INTEGER,
};

export default createCustomizableLunaticField(Input);
