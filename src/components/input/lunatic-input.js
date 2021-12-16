import React, { useCallback } from 'react';
import Input from './input';
import { InputContainer } from '../commons';
import './input.scss';

function LunaticInput(props) {
	const {
		label,
		id,
		value,
		handleChange,
		response,
		disabled,
		declarations,
		executeExpression,
	} = props;

	const onChange = useCallback(
		function (inputValue) {
			if (value !== inputValue) {
				handleChange(response, inputValue);
			}
		},
		[handleChange, response, value]
	);

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
		>
			<Input
				id={inputId}
				labelledBy={labelId}
				value={value}
				onChange={onChange}
				disabled={disabled}
			/>
		</InputContainer>
	);
}

export default React.memo(LunaticInput);
