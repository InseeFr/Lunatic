import React, { useCallback } from 'react';
import { FieldContainer, Fieldset } from '../../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticCheckboxGroup(props) {
	const { id, declarations, value, label, handleChange, response } = props;

	const onClick = useCallback(
		function (valueOption) {
			if (value !== valueOption) {
				handleChange(response, valueOption);
			}
		},
		[handleChange, response, value]
	);

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<FieldContainer id={id} value={value}>
				<Fieldset legend={label}>
					<DeclarationsAfterText declarations={declarations} />
					TODO
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default LunaticCheckboxGroup;
