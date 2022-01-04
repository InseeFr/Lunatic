import React from 'react';
import { InputContainer } from '../commons';
import Datepicker from './datepicker';
import { useOnHandleChange } from '../commons';
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
	bindingDependencies,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });

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
			bindingDependencies={bindingDependencies}
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
