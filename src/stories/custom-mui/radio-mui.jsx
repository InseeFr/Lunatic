import React, { useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function RadioButtonMui({ value, onClick, ...rest }) {
	const radioGroup = useRadioGroup();
	const checked = value === radioGroup.value;
	const handleClick = useCallback(
		function () {
			onClick(value);
		},
		[value, onClick]
	);
	return <Radio checked={checked} onClick={handleClick} />;
}

function RadioMui({ labelId, options, value, id, onClick }) {
	const radios = options.map(function ({ value: valueOption, label }) {
		return (
			<FormControlLabel
				key={valueOption}
				value={valueOption}
				control={<RadioButtonMui value={valueOption} onClick={onClick} />}
				label={label}
			/>
		);
	});
	return (
		<FormControl>
			<RadioGroup aria-labelledby={labelId} value={value} id={id}>
				{radios}
			</RadioGroup>
		</FormControl>
	);
}

export default RadioMui;
