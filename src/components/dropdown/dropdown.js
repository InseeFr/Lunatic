import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import DropdownSimple from './dropdown-simple';
import DropdownWritable from './dropdown-writable';
import './dropdown.scss';

function Dropdown({
	id,
	htmlFor,
	labelId,
	disabled,
	options,
	onSelect,
	writable,
	className,
}) {
	if (writable) {
		return (
			<DropdownWritable
				id={id}
				className={className}
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
			className={className}
			htmlFor={htmlFor}
			labelId={labelId}
			disabled={disabled}
			options={options}
			onSelect={onSelect}
		/>
	);
}

export default createCustomizableLunaticField(Dropdown);
