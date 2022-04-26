import React from 'react';
import { ComboBox } from '../../commons';
import SimpleOptionRenderer from './simple-option-renderer';
import SimpleLabelRenderer from './simple-label-renderer';

function DropdownSimple({
	id,
	htmlFor,
	labelId,
	disabled,
	options,
	onSelect,
	className,
	value,
}) {
	return (
		<ComboBox
			id={id}
			className={className}
			htmlFor={htmlFor}
			labelledBy={labelId}
			disabled={disabled}
			options={options}
			editable={false}
			onSelect={onSelect}
			optionRenderer={SimpleOptionRenderer}
			labelRenderer={SimpleLabelRenderer}
			value={value}
		/>
	);
}

export default DropdownSimple;
