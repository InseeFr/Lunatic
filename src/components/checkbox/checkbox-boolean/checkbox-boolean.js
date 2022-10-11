import React from 'react';
import { CheckboxOption } from '../commons';
import { createCustomizableLunaticField } from '../../commons';

function CheckboxBoolean({ checked, id, disabled, onClick, labelId, label }) {
	return (
		<CheckboxOption
			disabled={disabled}
			checked={checked}
			id={id}
			onClick={onClick}
			labelledBy={labelId}
			value={checked}
			label={label}
		/>
	);
}

export default createCustomizableLunaticField(
	CheckboxBoolean,
	'CheckboxBoolean'
);
