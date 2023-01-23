import React from 'react';
import Label from './label';
import FieldContainer from './field-container';
import VariableStatus from './variable-status';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import Missing from './missing';
import safetyLabel from '../safety-label';

function LunaticComponent(props) {
	const {
		id,
		labelId,
		inputId,
		label,
		preferences,
		declarations,
		className,
		value,
		children,
		missing,
		missingResponse,
		management,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<Label id={labelId} htmlFor={inputId} className={className}>
				{safetyLabel(label, id)}
			</Label>
			<DeclarationsAfterText declarations={declarations} id={id} />
			<FieldContainer value={value} id={id} preferences={preferences}>
				{children}
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} id={id} />
			{missing && missingResponse && <Missing {...props} />}
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}

export default LunaticComponent;
