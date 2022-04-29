import React from 'react';
import Label from './label';
import FieldContainer from './field-container';
import VariableStatus from './variable-status';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import safetyLabel from '../safety-label';

function LunaticComponent(props) {
	const {
		id,
		labelId,
		inputId,
		label,
		custom,
		preferences,
		declarations,
		className,
		value,
		children,
	} = props;

	return (
		<VariableStatus>
			<DeclarationsBeforeText declarations={declarations} custom={custom} />
			<Label
				id={labelId}
				htmlFor={inputId}
				className={className}
				custom={custom}
			>
				{safetyLabel(label, id)}
			</Label>
			<DeclarationsAfterText declarations={declarations} custom={custom} />
			<FieldContainer
				value={value}
				id={id}
				custom={custom}
				preferences={preferences}
			>
				{children}
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} custom={custom} />
		</VariableStatus>
	);
}

export default LunaticComponent;
