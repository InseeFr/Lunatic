import React from 'react';
import InputNumber from './html/input-number';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';

function LunaticInputNumber(props) {
	const {
		id,
		value,
		handleChange,
		response,
		errors,
		custom,
		declarations,
		preferences,
		label,
		disabled,
		missing,
		missingResponse,
		management,
		min,
		max,
		step,
		unit,
		description,
		required,
		readOnly,
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
			<InputNumber
				onChange={onChange}
				id={id}
				value={value}
				label={label}
				disabled={disabled || readOnly}
				min={min}
				max={max}
				step={step}
				unit={unit}
				required={required}
				errors={errors}
				custom={custom}
			/>
		</LunaticComponent>
	);
}

export default LunaticInputNumber;
