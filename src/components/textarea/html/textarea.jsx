import React, { useCallback } from 'react';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import './textarea.scss';

function checkValue(value) {
	return value || '';
}

function Textarea({
	id,
	rows,
	maxLength,
	cols,
	onChange,
	value,
	placeholder,
	label,
	description,
	errors,
}) {
	const labelId = `label-${id}`;
	const handleChange = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<div className="lunatic-textarea">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<textarea
				id={id}
				rows={rows}
				maxLength={maxLength}
				cols={cols}
				onChange={handleChange}
				value={checkValue(value)}
				placeholder={placeholder}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

export default createCustomizableLunaticField(Textarea, 'Textarea');
