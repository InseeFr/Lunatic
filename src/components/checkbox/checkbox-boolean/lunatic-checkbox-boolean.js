import React from 'react';
import CheckboxBoolean from './checkbox-boolean';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../../commons/use-on-handle-change';

function LunaticCheckboxBoolean({
	value,
	id,
	options,
	disabled,
	handleChange,
	response,
	custom,
	errors,
	label,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticComponent
			id={id}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
		>
			<CheckboxBoolean
				id={id}
				options={options}
				checked={value}
				onClick={onChange}
				disabled={disabled}
				custom={custom}
				label={label}
				errors={errors}
			/>
		</LunaticComponent>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
