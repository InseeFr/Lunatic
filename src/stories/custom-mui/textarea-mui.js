import React, { useCallback } from 'react';
import classnames from 'classnames';
import OutlinedInput from '@mui/material/OutlinedInput';

function TextareaMui({
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
	console.log({ maxLength, rows, cols });
	return (
		<OutlinedInput
			id={`lunatic-mui-textarea-${id}`}
			className={classnames('lunatic-mui-textarea', className)}
			multiline
			fullWidth
			components={{ elementType: 'textarea' }}
			onChange={handleChange}
			value={value}
			placeholder={placeholder}
			maxLength={maxLength}
			cols={cols}
		></OutlinedInput>
	);
}

export default TextareaMui;
