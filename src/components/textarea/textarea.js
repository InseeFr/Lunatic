import React, { useCallback } from 'react';
import { createCustomizableLunaticField } from '../commons';
import classnames from 'classnames';
import './textarea.scss';

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
			className={classnames('textarea-lunatic ', className)}
			rows={rows}
			maxLength={maxLength}
			cols={cols}
			onChange={handleChange}
			value={value}
			placeholder={placeholder}
		/>
	);
}

export default createCustomizableLunaticField(Textarea);
