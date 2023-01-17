import React from 'react';
import Datepicker from './datepicker';
import { createCustomizableLunaticField } from '../commons';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
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
		custom,
		preferences,
		declarations,
		missing,
		missingResponse,
		management,
	} = props;

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
				custom={custom}
			/>
		</LunaticComponent>
	);
};

export default createCustomizableLunaticField(
	LunaticDatepicker,
	'LunaticDatepicker'
);
