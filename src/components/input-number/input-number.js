import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from '../commons/components/label';
import { Errors } from '../commons';
import { createCustomizableLunaticField } from '../commons';
import './input-number.scss';

function InputNumber({
	id,
	value,
	onChange,
	disabled,
	readOnly,
	min,
	max,
	step,
	unit,
	label,
	errors,
	required,
	description,
}) {
	const labelId = `label-${id}`;
	const handleChange = useCallback(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(isNaN(val) ? null : val);
		},
		[onChange]
	);
	return (
		<div className="lunatic-input-number">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<input
				id={id}
				className={classnames({ disabled, readOnly })}
				type="number"
				onChange={handleChange}
				value={value ?? ''}
				labelledby={labelId}
				readOnly={readOnly}
				disabled={disabled}
				required={required}
				min={min}
				max={max}
				step={step}
			/>
			{unit && <span>{unit}</span>}
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

InputNumber.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.oneOf(
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array
	),
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	unit: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.array,
	description: PropTypes.string,
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
};

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
