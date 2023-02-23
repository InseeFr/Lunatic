import CheckboxBoolean from './html/checkbox-boolean';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import React from 'react';
import useOnHandleChange from '../../commons/use-on-handle-change';

function LunaticCheckboxBoolean({
	value,
	id,
	options,
	disabled,
	handleChange,
	response,
	errors,
	label,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
	autofocus,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<CheckboxBoolean
				id={id}
				options={options}
				checked={value}
				onClick={onChange}
				disabled={disabled}
				label={label}
				errors={errors}
				autofocus={autofocus}
			/>
		</LunaticComponent>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
