import React from 'react';
import { InputContainer } from '../commons';
import InputNumber from './input-number';
import { useOnHandleChange } from '../commons';

function LunaticInputNumber({
	value,
	declarations,
	label,
	response,
	id,
	disabled,
	readOnly,
	handleChange,
	min,
	max,
	step,
	iteration,
	custom,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });

	const inputId = `lunatic-input-${id}`;
	const labelId = `lunatic-input-label-${id}`;

	return (
		<InputContainer
			declarations={declarations}
			label={label}
			id={id}
			value={value}
			inputId={inputId}
			labelId={labelId}
			labelClassName="todo"
			iteration={iteration}
		>
			<InputNumber
				labelledBy={labelId}
				readOnly={readOnly}
				disabled={disabled}
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				step={step}
				custom={custom}
			/>
		</InputContainer>
	);
}

export default LunaticInputNumber;
