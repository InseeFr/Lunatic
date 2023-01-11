import React from 'react';
import FieldContainer from './field-container';
import VariableStatus from './variable-status';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';
import Missing from './missing';

function LunaticComponent(props) {
	const {
		id,
		custom,
		preferences,
		declarations,
		value,
		children,
		missing,
		missingResponse,
		management,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText
				declarations={declarations}
				id={id}
				custom={custom}
			/>
			<FieldContainer
				value={value}
				id={id}
				custom={custom}
				preferences={preferences}
			>
				{children}
			</FieldContainer>
			<DeclarationsAfterText
				declarations={declarations}
				id={id}
				custom={custom}
			/>
			<DeclarationsDetachable
				declarations={declarations}
				id={id}
				custom={custom}
			/>
			{missing && missingResponse && <Missing {...props} />}
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}

export default LunaticComponent;
