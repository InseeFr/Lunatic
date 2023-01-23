import React from 'react';
import Input from './html/input';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';

function LunaticInput(props) {
	const {
		id,
		value,
		handleChange,
		response,
		errors,
		declarations,
		preferences,
		label,
		disabled,
		missing,
		missingResponse,
		management,
		description,
		required,
		maxLength,
	} = props;

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
		>
			<Input
				id={id}
				value={value}
				onChange={onChange}
				label={label}
				disabled={disabled}
				errors={errors}
				required={required}
				maxLength={maxLength}
			/>
		</LunaticComponent>
	);
}

export default LunaticInput;
