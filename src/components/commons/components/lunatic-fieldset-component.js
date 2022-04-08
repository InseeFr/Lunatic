import React from 'react';
import FieldContainer from './field-container';
import Fieldset from './fieldset';
import VariableStatus from './variable-status';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticFieldsetComponent(props) {
	const { id, label, custom, preferences, declarations, value, children } =
		props;

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
		</VariableStatus>
	);
}

export default LunaticFieldsetComponent;
