import './input.scss';

import { Errors, Label, createCustomizableLunaticField } from '../../commons';
import React, { useCallback } from 'react';

import { DescritionPropsType } from '../../commons/components/description';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
	autofocus,
}) {
	const labelId = `label-${id}`;
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);
	const autoFocusFn = useCallback(
		(element) => (element && autofocus ? element.focus() : null),
		[autofocus]
	);
	return (
		<div className={classnames('lunatic-input')}>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<input
				ref={autoFocusFn}
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
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
	]),
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	autofocus: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
	description: DescritionPropsType,
};

Input.defaultValue = {
	disabled: false,
	label: undefined,
	errors: undefined,
	description: undefined,
	required: true,
	maxLength: Number.MAX_SAFE_INTEGER,
	autofocus: false,
};

export default createCustomizableLunaticField(Input, 'Input');
