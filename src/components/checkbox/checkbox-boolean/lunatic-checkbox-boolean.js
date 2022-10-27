import React from 'react';
import CheckboxBoolean from './checkbox-boolean';
import { createLunaticComponent, Errors } from '../../commons';

function LunaticCheckboxBoolean({
	value,
	id,
	options,
	disabled,
	onChange,
	custom,
	errors,
}) {
	return (
		<>
			<CheckboxBoolean
				id={id}
				options={options}
				checked={value}
				onClick={onChange}
				disabled={disabled}
				custom={custom}
			/>
			<Errors errors={errors} activeId={id} />
		</>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default createLunaticComponent(LunaticCheckboxBoolean, {
	fieldset: true,
	inputId: 'lunatic-checkbox-boolean',
});
