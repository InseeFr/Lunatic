import LunaticComponent from '../commons/components/lunatic-component-without-label';
import RadioGroup from './html/radio-group';
import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import useOnHandleChange from '../commons/use-on-handle-change';

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
		shortcut,
		management,
		className,
		autofocus,
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
				shortcut={shortcut}
				autofocus={autofocus}
			/>
		</LunaticComponent>
	);
}

LunaticRadioGroup.defaultProps = { className: 'lunatic-radio-group' };

export default createCustomizableLunaticField(
	LunaticRadioGroup,
	'LunaticRadioGroup'
);
