import React from 'react';
import { FieldContainer, Fieldset } from '../../commons';
import CheckboxGroup from './checkbox-group';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticCheckboxGroup(props) {
	const { id, declarations, value, label, handleChange, responses } = props;

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<FieldContainer id={id} value={value}>
				<Fieldset legend={label}>
					<DeclarationsAfterText declarations={declarations} />
					<CheckboxGroup
						id={id}
						options={responses}
						value={value}
						handleChange={handleChange}
					/>
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default LunaticCheckboxGroup;
