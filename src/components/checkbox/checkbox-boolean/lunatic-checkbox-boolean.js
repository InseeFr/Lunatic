import React from 'react';
import { CheckboxOption } from '../commons';
import { useOnHandleChange, LunaticField } from '../../commons';
import CheckboxBoolean from './checkbox-boolean';

function LunaticCheckboxBoolean({
	value,
	declarations,
	label,
	response,
	id,
	disabled,
	handleChange,
	custom,
}) {
	const booleanValue = value === true ? value : false;
	const onClick = useOnHandleChange({ handleChange, response, value });

	const contentId = `lunatic-checkbox-boolean-${id}`;
	const labelId = `lunatic-checkbox-boolean-label-${id}`;

	return (
		<LunaticField
			label={label}
			contentId={contentId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-checkbox-boolean"
			custom={custom}
		>
			<CheckboxBoolean
				checked={booleanValue}
				id={id}
				disabled={disabled}
				onClick={onClick}
				labelId={labelId}
				custom={custom}
			/>
		</LunaticField>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
