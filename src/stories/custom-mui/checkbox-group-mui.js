import React, { useCallback } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function CheckBoxOption({
	checkboxId,
	labelId,
	label,
	checked,
	handleChange,
	response,
}) {
	const onClickOption = useCallback(
		function () {
			handleChange(response, !checked);
		},
		[handleChange, response, checked]
	);

	return (
		<FormControlLabel
			id={checkboxId}
			control={<Checkbox checked={checked} onClick={onClickOption} />}
			label={label}
			aria-labelledby={labelId}
		/>
	);
}

function CheckboxGroup({ options, value, id, handleChange }) {
	const optionsEl = options.map(function (option, index) {
		const { label, response } = option;

		if (response && value) {
			const { name } = response;

			if (name in value) {
				const checked = value[name] || false;
				const checkboxId = `lunatic-checkbox-${id}-${name}`;
				const labelId = `lunatic-checkbox-label-${id}-${name}`;

				return (
					<CheckBoxOption
						key={name}
						checkboxId={checkboxId}
						index={index}
						label={label}
						labelId={labelId}
						checked={checked}
						response={response}
						handleChange={handleChange}
					/>
				);
			}
		}
		return null;
	});

	return <FormGroup>{optionsEl}</FormGroup>;
}

export default CheckboxGroup;
