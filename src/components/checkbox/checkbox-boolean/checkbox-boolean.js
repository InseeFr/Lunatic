import React from 'react';
import { CheckboxOption } from '../commons';
import { createCustomizableLunaticField } from '../../commons';

function CheckboxBoolean({ checked, id, disabled, onClick, labelId }) {
	return (
		<CheckboxOption
			disabled={disabled}
			checked={checked}
			id={id}
			onClick={onClick}
			labelledBy={labelId}
			value={!checked}
		/>
	);
}

export default createCustomizableLunaticField(CheckboxBoolean);
