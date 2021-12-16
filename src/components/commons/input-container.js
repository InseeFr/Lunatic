import React, { useEffect, useState } from 'react';
import { FieldContainer, Label } from '../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';

function InputContainer({
	declarations,
	executeExpression,
	label,
	id,
	value,
	inputId,
	labelId,
	children,
	labelClassName,
}) {
	const [labelCompute, setLabelCompute] = useState(label);

	useEffect(
		function () {
			setLabelCompute(executeExpression(label));
		},
		[label, executeExpression]
	);

	return (
		<>
			<DeclarationsBeforeText
				declarations={declarations}
				executeExpression={executeExpression}
			/>
			<Label id={labelId} htmlFor={inputId} className={labelClassName}>
				{labelCompute}
			</Label>
			<DeclarationsAfterText
				declarations={declarations}
				executeExpression={executeExpression}
			/>
			<FieldContainer value={value} id={id}>
				{children}
			</FieldContainer>
			<DeclarationsDetachable
				declarations={declarations}
				executeExpression={executeExpression}
			/>
		</>
	);
}

export default InputContainer;
