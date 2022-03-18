import React from 'react';
import { CheckboxOption } from '../commons';
import { useOnHandleChange, LunaticField } from '../../commons';

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
	const onClick = useOnHandleChange({ handleChange, response, value });

	const contentId = `lunatic-checkbox-boolean-${id}`;
	const labelId = `lunatic-checkbox-boolean-label-${id}`;
	const booleanValue = value === true ? value : false;

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
			<CheckboxOption
				disabled={disabled}
				checked={booleanValue}
				id={id}
				value={!booleanValue}
				onClick={onClick}
				labelledBy={labelId}
				custom={custom}
			/>
		</LunaticField>
	);
}

LunaticCheckboxBoolean.defaultProps = { value: false };

export default LunaticCheckboxBoolean;
