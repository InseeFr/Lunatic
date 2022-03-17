import React, { useCallback } from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';

function TextareaMui({
	id,
	rows,
	maxLength,
	cols,
	onChange,
	className,
	value,
	placeholder,
}) {
	const handleChange = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<OutlinedInput
			multiline
			fullWidth
			components={{ elementType: 'textarea' }}
			onChange={handleChange}
			value={value}
			placeholder={placeholder}
		></OutlinedInput>
	);
}

export default TextareaMui;
