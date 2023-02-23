import Datepicker from './html/datepicker';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import useOnHandleChange from '../commons/use-on-handle-change';

const LunaticDatepicker = (props) => {
	const {
		id,
		errors,
		handleChange,
		response,
		value,
		disabled,
		readOnly,
		min,
		max,
		label,
		description,
		preferences,
		declarations,
		missing,
		missingResponse,
		management,
		autofocus,
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
			handleChange={handleChange}
		>
			<Datepicker
				disabled={disabled}
				readOnly={readOnly}
				value={value}
				onChange={onChange}
				id={id}
				min={min}
				max={max}
				label={label}
				description={description}
				errors={errors}
				autofocus={autofocus}
			/>
		</LunaticComponent>
	);
};

export default createCustomizableLunaticField(
	LunaticDatepicker,
	'LunaticDatepicker'
);
