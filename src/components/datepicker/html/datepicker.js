import './datepicker.scss';

import { Errors, Label, createCustomizableLunaticField } from '../../commons';
import React, { useCallback } from 'react';

import DatepickerContainer from './datepicker-container';
import DatepickerInput from './datepicker-input';
import PropTypes from 'prop-types';

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
	autofocus,
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
				autofocus={autofocus}
			/>
			<Errors errors={errors} activeId={id} />
		</DatepickerContainer>
	);
}

Datepicker.propTypes = {
	readOnly: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
	]),
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.array,
	]),
	autofocus: PropTypes.bool,
};
Datepicker.defaultProps = { value: '', autofocus: false };

export default createCustomizableLunaticField(Datepicker, 'Datepicker');
