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
		custom,
		preferences,
		declarations,
		value,
		children,
		missingResponse,
		missing,
	} = props;

	return (
		<VariableStatus>
			<DeclarationsBeforeText declarations={declarations} custom={custom} />
			<FieldContainer
				value={value}
				id={id}
				custom={custom}
				preferences={preferences}
			>
				<Fieldset legend={label} custom={custom}>
					<DeclarationsAfterText declarations={declarations} custom={custom} />
					{children}
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} custom={custom} />
			{missing && missingResponse && <Missing {...props} />}
		</VariableStatus>
	);
}

export default LunaticFieldsetComponent;
