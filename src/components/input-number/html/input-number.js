import './input-number.scss';

import { Errors, Label, createCustomizableLunaticField } from '../../commons';
import React, { useCallback } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

function InputNumber({
	id,
	value,
	onChange,
	disabled,
	min,
	max,
	step,
	unit,
	label,
	errors,
	required,
	description,
	autofocus,
}) {
	const labelId = `label-${id}`;
	const handleChange = useCallback(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(isNaN(val) ? null : val);
		},
		[onChange]
	);
	const autoFocusFn = useCallback(
		(element) => (element && autofocus ? element.focus() : null),
		[autofocus]
	);
	return (
		<div className="lunatic-input-number">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<input
				id={id}
				ref={autoFocusFn}
				className={classnames({ disabled })}
				type="number"
				onChange={handleChange}
				value={value ?? ''}
				labelledby={labelId}
				disabled={disabled}
				required={required}
				min={min}
				max={max}
				step={step}
				lang="en"
			/>
			{unit && <span>{unit}</span>}
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

InputNumber.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
	]),
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	autofocus: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	unit: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.array,
	]),
};

InputNumber.defaultValue = {
	disabled: false,
	required: true,
	min: undefined,
	max: undefined,
	step: undefined,
	unit: undefined,
	label: undefined,
	errors: undefined,
	description: undefined,
	autofocus: false,
};

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
