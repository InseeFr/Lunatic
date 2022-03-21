import React from 'react';
import { FieldContainer, Fieldset } from '../../commons';
import CheckboxGroup from './checkbox-group';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../../declarations';

function LunaticCheckboxGroup(props) {
	const { id, declarations, value, label, handleChange, responses, custom } =
		props;

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} custom={custom} />
			<FieldContainer id={id} value={value} custom={custom}>
				<Fieldset legend={label}>
					<DeclarationsAfterText declarations={declarations} custom={custom} />
					<CheckboxGroup
						id={id}
						options={responses}
						value={value}
						handleChange={handleChange}
						custom={custom}
					/>
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default LunaticCheckboxGroup;
