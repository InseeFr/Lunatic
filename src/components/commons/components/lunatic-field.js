import React from 'react';
import Label from './label';
import FieldContainer from './field-container';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticFields({
	label,
	contentId,
	labelId,
	declarations,
	id,
	value,
	children,
	className,
}) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<Label id={labelId} htmlFor={contentId} className={className}>
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

export default LunaticFields;
