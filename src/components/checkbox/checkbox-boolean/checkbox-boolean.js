import React from 'react';
import { CheckboxOption } from '../commons';
import { createCustomizableLunaticField, Errors } from '../../commons';

function CheckboxBoolean({
	checked,
	id,
	disabled,
	onClick,
	labelId,
	label,
	description,
	errors,
}) {
	return (
		<div className="lunatic-checkbox-boolean">
			<CheckboxOption
				disabled={disabled}
				checked={checked}
				id={id}
				onClick={onClick}
				labelledBy={labelId}
				value={checked}
				label={label}
				description={description}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

export default createCustomizableLunaticField(
	CheckboxBoolean,
	'CheckboxBoolean'
);
