import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import DropdownSimple from './dropdown-simple';
import DropdownWritable from './dropdown-writable';

function Dropdown({
	id,
	htmlFor,
	labelId,
	disabled,
	options,
	onSelect,
	writable,
}) {
	if (writable) {
		return (
			<DropdownWritable
				id={id}
				htmlFor={htmlFor}
				labelId={labelId}
				disabled={disabled}
				options={options}
				onSelect={onSelect}
			/>
		);
	}
	return (
		<DropdownSimple
			id={id}
			htmlFor={htmlFor}
			labelId={labelId}
			disabled={disabled}
			options={options}
			onSelect={onSelect}
		/>
	);
}

export default createCustomizableLunaticField(Dropdown);
