import React from 'react';
import LunaticRadioGroup from '../../radio';
import { createCustomizableLunaticField } from '../../commons';
import './checkbox-one.scss';

function CheckboxOne({
	id,
	options,
	value,
	custom,
	errors,
	handleChange,
	response,
	label,
	description,
	preferences,
	declarations,
	missingResponse,
	missing,
	management,
}) {
	return (
		<LunaticRadioGroup
			id={id}
			className="lunatic-checkbox-one"
			options={options}
			value={value}
			custom={custom}
			errors={errors}
			handleChange={handleChange}
			response={response}
			label={label}
			description={description}
			preferences={preferences}
			declarations={declarations}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
			checkboxStyle={true}
		/>
	);
}
export default createCustomizableLunaticField(CheckboxOne, 'CheckboxOne');
