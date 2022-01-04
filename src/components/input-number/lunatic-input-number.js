import React from 'react';
import { InputContainer } from '../commons';
import InputNumber from './input-number';
import { useOnHandleChange } from '../commons';

function LunaticInputNumber({
	value,
	declarations,
	executeExpression,
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
	bindingDependencies,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });

	const inputId = `lunatic-input-${id}`;
	const labelId = `lunatic-input-label-${id}`;

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
			bindingDependencies={bindingDependencies}
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
			/>
		</InputContainer>
	);
}

export default LunaticInputNumber;
