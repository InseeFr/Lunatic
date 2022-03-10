import React from 'react';
import RadioGroup from './radio-group';
import { FieldContainer, Fieldset, useOnHandleChange } from '../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import './radio.scss';

function LunaticRadioGroup(props) {
	const {
		label,
		id,
		options,
		value,
		handleChange,
		response,
		declarations,
		checkboxStyle,
	} = props;

	const onClick = useOnHandleChange({ handleChange, response, value });

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<FieldContainer id={id} value={value}>
				<Fieldset legend={label}>
					<DeclarationsAfterText declarations={declarations} />
					<RadioGroup
						id={id}
						options={options}
						value={value}
						onClick={onClick}
						checkboxStyle={checkboxStyle}
					/>
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default React.memo(LunaticRadioGroup);
