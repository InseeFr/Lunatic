import React from 'react';
import LunaticComponent from '../../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../../commons/use-on-handle-change';
import CheckboxOne from './html/checkbox-one';

function LunaticCheckboxOne({
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
	const onSelect = useOnHandleChange({ handleChange, response, value });
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
			<CheckboxOne
				id={id}
				className="lunatic-checkbox-one"
				options={options}
				value={value}
				custom={custom}
				errors={errors}
				onSelect={onSelect}
				response={response}
				label={label}
			/>
		</LunaticComponent>
	);
}

export default LunaticCheckboxOne;
