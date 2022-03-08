import React from 'react';
import { CheckboxOption } from '../commons';
import { Label, FieldContainer, useOnHandleChange } from '../../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticCheckboxBoolean({
	value,
	declarations,
	label,
	response,
	id,
	disabled,
	handleChange,
}) {
	const onClick = useOnHandleChange({ handleChange, response, value });

	const inputId = `lunatic-checkbox-boolean-${id}`;
	const labelId = `lunatic-checkbox-boolean-label-${id}`;
	const booleanValue = value === true ? value : false;

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<Label
				id={labelId}
				htmlFor={inputId}
				className="lunatic-checkbox-boolean"
			>
				{label}
			</Label>
			<DeclarationsAfterText declarations={declarations} />
			<FieldContainer value={value} id={id}>
				<CheckboxOption
					disabled={disabled}
					checked={booleanValue}
					id={id}
					value={!booleanValue}
					onClick={onClick}
					labelledBy={labelId}
				/>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
