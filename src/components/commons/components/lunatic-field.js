import React from 'react';
import Label from './label';
import FieldContainer from './field-container';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticField({
	label,
	contentId,
	labelId,
	declarations,
	id,
	value,
	children,
	className,
	custom,
}) {
	return (
		<>
			<DeclarationsBeforeText declarations={declarations} custom={custom} />
			<Label
				id={labelId}
				htmlFor={contentId}
				className={className}
				custom={custom}
			>
				{label}
			</Label>
			<DeclarationsAfterText declarations={declarations} custom={custom} />
			<FieldContainer value={value} id={id} custom={custom}>
				{children}
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} custom={custom} />
		</>
	);
}

export default LunaticField;
