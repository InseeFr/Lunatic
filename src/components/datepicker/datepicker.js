import React, { useCallback } from 'react';
import './datepicker.scss';
import { Errors, Label } from '../commons';
import { createCustomizableLunaticField } from '../commons';
import DatepickerInput from './datepicker-input';
import DatepickerContainer from './datepicker-container';

function Datepicker({
	disabled,
	readOnly,
	value,
	onChange,
	id,
	min,
	max,
	label,
	errors,
	description,
}) {
	const labelId = `lunatic-datepicker-${id}`;
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);

	return (
		<DatepickerContainer>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<DatepickerInput
				id={id}
				labelId={labelId}
				readOnly={readOnly}
				disabled={disabled}
				value={value}
				onChange={handleChange}
				min={min}
				max={max}
			/>
			<Errors errors={errors} activeId={id} />
		</DatepickerContainer>
	);
}

Datepicker.defaultProps = { value: '' };

export default createCustomizableLunaticField(Datepicker, 'Datepicker');
