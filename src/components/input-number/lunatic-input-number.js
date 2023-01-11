import React from 'react';
import InputNumber from './input-number';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import { Errors } from '../commons';

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
		>
			<InputNumber
				onChange={onChange}
				id={id}
				value={value}
				label={label}
				disabled={disabled}
				min={min}
				max={max}
				step={step}
				unit={unit}
			/>
			<Errors errors={errors} activeId={id} />
		</LunaticComponent>
	);
}

export default LunaticInputNumber;
