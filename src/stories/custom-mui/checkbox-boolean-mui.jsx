import React, { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';

function CheckboxBooleanMui({ checked, id, disabled, onClick, labelId }) {
	const handleClick = useCallback(
		function () {
			onClick(!checked);
		},
		[checked, onClick]
	);

	return (
		<Checkbox
			disabled={disabled}
			checked={checked}
			id={id}
			onClick={handleClick}
			aria-labelledby={labelId}
		/>
	);
}

export default CheckboxBooleanMui;
