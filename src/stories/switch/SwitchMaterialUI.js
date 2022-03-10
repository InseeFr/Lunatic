import React, { useCallback } from 'react';
import Switch from '@mui/material/Switch';

function SwitchMaterialUI({
	checked,
	disabled,
	handleChange,
	statusLabel,
	labelId,
}) {
	const onClick = useCallback(
		function () {
			handleChange(!checked);
		},
		[checked]
	);
	return (
		<Switch
			checked={checked}
			onClick={onClick}
			inputProps={{ 'aria-labelledby': labelId, 'aria-checked': checked }}
		/>
	);
}

export default SwitchMaterialUI;
