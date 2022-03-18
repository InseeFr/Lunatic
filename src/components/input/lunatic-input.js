import React from 'react';
import Input from './input';
import { InputContainer } from '../commons';
import './input.scss';
import { useOnHandleChange } from '../commons';

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
		iteration,
		className,
		custom,
	} = props;

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
			labelClassName={className}
			iteration={iteration}
		>
			<Input
				id={inputId}
				labelledBy={labelId}
				value={value}
				onChange={onChange}
				disabled={disabled}
				custom={custom}
			/>
		</InputContainer>
	);
}

LunaticInput.defaultProps = {
	className: 'todo',
};

export default React.memo(LunaticInput);
