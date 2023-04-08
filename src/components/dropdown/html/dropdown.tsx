import React from 'react';
import { createCustomizableLunaticField } from '../../commons';
import DropdownSimple from './dropdown-simple';
import DropdownWritable from './dropdown-writable';
import './dropdown.scss';
import { LunaticComponentProps } from '../../type';

export type DropdownProps = {
	onSelect: (v: string | null) => void;
	className?: string;
} & Pick<
	LunaticComponentProps<'Dropdown'>,
	| 'id'
	| 'disabled'
	| 'options'
	| 'writable'
	| 'value'
	| 'description'
	| 'label'
	| 'errors'
>;

function Dropdown({
	id,
	disabled,
	options,
	onSelect,
	writable,
	className,
	value,
	description,
	label,
	errors,
}: DropdownProps) {
	if (writable) {
		return (
			<DropdownWritable
				id={id}
				className={className}
				disabled={disabled}
				options={options}
				onSelect={onSelect}
				value={value}
				label={label}
				errors={errors}
				description={description}
			/>
		);
	}
	return (
		<DropdownSimple
			id={id}
			className={className}
			disabled={disabled}
			options={options}
			onSelect={onSelect}
			value={value}
			label={label}
			errors={errors}
			description={description}
		/>
	);
}

export default createCustomizableLunaticField(Dropdown, 'Dropdown');
