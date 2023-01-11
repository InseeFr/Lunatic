import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Errors } from '../commons';
import Label from '../commons/components/label';
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
	label,
	description,
	id,
	errors,
}) {
	const labelId = `label-${id}`;
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);
	return (
		<div className={classnames('lunatic-input')}>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<input
				id={id}
				labelledbby={labelId}
				autoComplete="off"
				type="text"
				disabled={disabled}
				value={checkValue(value)}
				onChange={handleChange}
				aria-required={required}
				required={required}
				maxLength={maxLength}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.oneOf(
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array
	),
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.array,
	description: PropTypes.string,
};

Input.defaultValue = {
	disabled: false,
	label: undefined,
	errors: undefined,
	description: undefined,
	required: true,
	maxLength: Number.MAX_SAFE_INTEGER,
};

export default createCustomizableLunaticField(Input, 'Input');
