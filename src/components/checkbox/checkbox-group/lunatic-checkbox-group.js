import React from 'react';
import CheckboxGroup from './checkbox-group';
import { createLunaticComponent } from '../../commons';

function LunaticCheckboxGroup({
	id,
	value,

	responses,
	custom,
	handleChange,
}) {
	return (
		<CheckboxGroup
			id={id}
			options={responses}
			value={value}
			handleChange={handleChange}
			custom={custom}
		/>
	);
}

export default createLunaticComponent(LunaticCheckboxGroup, {
	fieldset: true,
	inputId: 'lunatic-checkbox-group',
});
