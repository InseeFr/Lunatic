import React from 'react';
import RadioGroup from './radio-group';
import LunaticfieldSetComponent from '../commons/components/lunatic-fieldset-component-without-fieldset';
import useOnHandleChange from '../commons/use-on-handle-change';
import { createCustomizableLunaticField } from '../commons';
import './radio.scss';

function LunaticRadioGroup(props) {
	const {
		id,
		options,
		value,
		checkboxStyle,
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
	} = props;
	console.log({ description });
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticfieldSetComponent
			id={id}
			label={label}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
		>
			<RadioGroup
				id={id}
				options={options}
				value={value}
				onSelect={onChange}
				checkboxStyle={checkboxStyle}
				errors={errors}
				custom={custom}
				label={label}
				description={description}
			/>
		</LunaticfieldSetComponent>
	);
}

export default createCustomizableLunaticField(
	LunaticRadioGroup,
	'LunaticRadioGroup'
);
