import React, { useCallback } from 'react';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function SwitchMui({ checked, disabled, onClick, statusLabel, labelId }) {
	const handleClick = useCallback(
		function () {
			onClick(!checked);
		},
		[checked, onClick]
	);

	const { true: trueStatus, false: falseStatue } = statusLabel;
	return (
		<Stack direction="row" spacing={1} alignItems="center">
			<Typography>{falseStatue}</Typography>
			<Switch
				checked={checked}
				onClick={handleClick}
				disabled={disabled}
				inputProps={{ 'aria-labelledby': labelId, 'aria-checked': checked }}
			/>
			<Typography>{trueStatus}</Typography>
		</Stack>
	);
}

export default SwitchMui;
