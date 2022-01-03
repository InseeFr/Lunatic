import React from 'react';
import { FieldContainer, Label } from '../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';

function InputContainer({
	declarations,
	label,
	id,
	value,
	inputId,
	labelId,
	children,
	labelClassName,
}) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<Label id={labelId} htmlFor={inputId} className={labelClassName}>
				{label}
			</Label>
			<DeclarationsAfterText declarations={declarations} />
			<FieldContainer value={value} id={id}>
				{children}
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default InputContainer;
