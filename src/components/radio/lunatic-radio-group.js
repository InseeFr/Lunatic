import React from 'react';
import RadioGroup from './radio-group';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
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
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticComponent
			id={id}
			label={label}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
			description={description}
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
			/>
		</LunaticComponent>
	);
}

export default createCustomizableLunaticField(
	LunaticRadioGroup,
	'LunaticRadioGroup'
);
