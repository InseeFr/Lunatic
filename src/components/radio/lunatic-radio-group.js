import React from 'react';
import RadioGroup from './html/radio-group';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import { createCustomizableLunaticField } from '../commons';

function LunaticRadioGroup(props) {
	const {
		id,
		options,
		value,
		checkboxStyle,
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
		className,
	} = props;
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticComponent
			id={id}
			label={label}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missingResponse={missingResponse}
			missing={missing}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<RadioGroup
				id={id}
				options={options}
				value={value}
				onSelect={onChange}
				checkboxStyle={checkboxStyle}
				errors={errors}
				label={label}
				className={className}
			/>
		</LunaticComponent>
	);
}

LunaticRadioGroup.defaultProps = { className: 'lunatic-radio-group' };

export default createCustomizableLunaticField(
	LunaticRadioGroup,
	'LunaticRadioGroup'
);
