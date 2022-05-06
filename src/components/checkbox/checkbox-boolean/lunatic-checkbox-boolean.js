import React from 'react';
import CheckboxBoolean from './checkbox-boolean';
import { createLunaticComponent } from '../../commons';

function LunaticCheckboxBoolean({
	value,
	id,
	options,
	disabled,
	onChange,
	custom,
}) {
	return (
		<CheckboxBoolean
			id={id}
			options={options}
			checked={value}
			onClick={onChange}
			disabled={disabled}
			custom={custom}
		/>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default createLunaticComponent(LunaticCheckboxBoolean, {
	fieldset: true,
	inputId: 'lunatic-checkbox-boolean',
});
