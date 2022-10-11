import React from 'react';
import CheckboxGroup from './checkbox-group';
import {
	createCustomizableLunaticField,
	createLunaticComponent,
	Errors,
} from '../../commons';

function LunaticCheckboxGroup({
	id,
	value,
	responses,
	custom,
	handleChange,
	errors,
	label,
}) {
	return (
		<>
			<CheckboxGroup
				id={id}
				options={responses}
				value={value}
				handleChange={handleChange}
				custom={custom}
				label={label}
			/>
			<Errors errors={errors} activeId={id} />
		</>
	);
}

export default createLunaticComponent(
	createCustomizableLunaticField(LunaticCheckboxGroup, 'LunaticCheckboxGroup'),
	{
		fieldset: true,
		inputId: 'lunatic-checkbox-group',
	}
);
