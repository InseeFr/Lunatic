import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import InputNumberDefault from './input-number-default';
import InputNumberThousand from './input-number-thousand';
import './input-number.scss';

function InputNumber({
	id,
	value,
	onChange,
	disabled,
	min,
	max,
	decimals,
	unit,
	label,
	errors,
	required,
	description,
}) {
	const labelId = `label-${id}`;

	const [useThousandSeparator] = useState(max && max > 1000);

	return (
		<div className="lunatic-input-number">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			{useThousandSeparator && (
				<InputNumberThousand
					id={id}
					value={value}
					onChange={onChange}
					disabled={disabled}
					required={required}
					labelId={labelId}
					max={max}
					min={min}
					decimals={decimals}
				/>
			)}

			{!useThousandSeparator && (
				<InputNumberDefault
					id={id}
					value={value}
					onChange={onChange}
					disabled={disabled}
					required={required}
					labelId={labelId}
					max={max}
					min={min}
					decimals={decimals}
				/>
			)}
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
	min: PropTypes.number,
	max: PropTypes.number,
	decimals: PropTypes.number,
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
	decimals: 0,
	unit: undefined,
	label: undefined,
	errors: undefined,
	description: undefined,
};

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
