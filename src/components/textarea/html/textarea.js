import './textarea.scss';

import { Errors, Label, createCustomizableLunaticField } from '../../commons';
import React, { useCallback } from 'react';

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
	autofocus,
}) {
	const labelId = `label-${id}`;
	const handleChange = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);
	const autoFocusFn = useCallback(
		(element) => (element && autofocus ? element.focus() : null),
		[autofocus]
	);
	return (
		<div className="lunatic-textarea">
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<textarea
				id={id}
				ref={autoFocusFn}
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
