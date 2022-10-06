import React, { useCallback } from 'react';
import { createCustomizableLunaticField } from '../commons';
import classnames from 'classnames';
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
	className,
	placeholder,
}) {
	const handleChange = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<textarea
			id={id}
			className={classnames('lunatic-textarea', className)}
			rows={rows}
			maxLength={maxLength}
			cols={cols}
			onChange={handleChange}
			value={checkValue(value)}
			placeholder={placeholder}
		/>
	);
}

export default createCustomizableLunaticField(Textarea, 'Textarea');
