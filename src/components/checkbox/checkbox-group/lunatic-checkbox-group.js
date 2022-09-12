import React from 'react';
import CheckboxGroup from './checkbox-group';
import { createLunaticComponent, Errors } from '../../commons';

function LunaticCheckboxGroup({
	id,
	value,
	responses,
	custom,
	handleChange,
	errors,
}) {
	return (
		<>
			<CheckboxGroup
				id={id}
				options={responses}
				value={value}
				handleChange={handleChange}
				custom={custom}
			/>
			<Errors errors={errors} />
		</>
	);
}

export default createLunaticComponent(LunaticCheckboxGroup, {
	fieldset: false,
	inputId: 'lunatic-checkbox-group',
});
