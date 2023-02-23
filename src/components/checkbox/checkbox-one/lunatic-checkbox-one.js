import CheckboxOne from './html/checkbox-one';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import React from 'react';
import useOnHandleChange from '../../commons/use-on-handle-change';

function LunaticCheckboxOne({
	id,
	options,
	value,
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
	shortcut,
	autofocus,
}) {
	const onSelect = useOnHandleChange({ handleChange, response, value });
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
			<CheckboxOne
				id={id}
				className="lunatic-checkbox-one"
				options={options}
				value={value}
				errors={errors}
				onSelect={onSelect}
				response={response}
				label={label}
				shortcut={shortcut}
				autofocus={autofocus}
			/>
		</LunaticComponent>
	);
}

export default LunaticCheckboxOne;
