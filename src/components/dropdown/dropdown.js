import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import DropdownSimple from './dropdown-simple';
import DropdownWritable from './dropdown-writable';
import './dropdown.scss';

function Dropdown({
	id,
	labelId,
	disabled,
	options,
	onSelect,
	htmlFor,
	writable,
	className,
	value,
}) {
	if (writable) {
		return (
			<DropdownWritable
				id={id}
				className={className}
				htmlFor={id}
				labelId={labelId}
				disabled={disabled}
				options={options}
				onSelect={onSelect}
				value={value}
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
			value={value}
		/>
	);
}

export default createCustomizableLunaticField(Dropdown);
