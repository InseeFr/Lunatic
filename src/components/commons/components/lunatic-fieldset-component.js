import React from 'react';
import FieldContainer from './field-container';
import Fieldset from './fieldset';
import VariableStatus from './variable-status';
import Missing from './missing';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticFieldsetComponent(props) {
	const {
		id,
		label,
		preferences,
		declarations,
		value,
		children,
		missingResponse,
		missing,
		management,
	} = props;
	const content = (
		<>
			<DeclarationsBeforeText declarations={declarations} id={id} />
			<FieldContainer value={value} id={id} preferences={preferences}>
				<Fieldset legend={label}>
					<DeclarationsAfterText declarations={declarations} id={id} />
					{children}
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} id={id} />
			{missing && missingResponse && <Missing {...props} />}
		</>
	);
	return management ? <VariableStatus>{content}</VariableStatus> : content;
}

export default LunaticFieldsetComponent;
