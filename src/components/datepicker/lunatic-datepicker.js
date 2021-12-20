import React, { useCallback } from 'react';
import { InputContainer } from '../commons';
import Datepicker from './datepicker';
import './datepicker.scss';

function LunaticDatepicker({
	declarations,
	executeExpression,
	label,
	id,
	response,
	value,
	handleChange,
	disabled,
	readOnly,
	iteration,
}) {
	const onChange = useCallback(
		function (inputValue) {
			if (value !== inputValue) {
				handleChange(response, inputValue);
			}
		},
		[handleChange, response, value]
	);

	const inputId = `lunatic-datepicker-${id}`;
	const labelId = `lunatic-datepicker-label-${id}`;

	return (
		<InputContainer
			declarations={declarations}
			executeExpression={executeExpression}
			label={label}
			id={id}
			value={value}
			inputId={inputId}
			labelId={labelId}
			labelClassName="todo"
			iteration={iteration}
		>
			<Datepicker
				id={inputId}
				labelledBy={labelId}
				value={value}
				onChange={onChange}
				disabled={disabled}
				readOnly={readOnly}
			/>
		</InputContainer>
	);
}

export default LunaticDatepicker;
