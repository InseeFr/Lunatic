import React, { ReactNode, useCallback, useState } from 'react';
import { ComboBox } from '../../../commons';
import WritableOptionRenderer from './writable-option-renderer';
import WritableLabelRenderer from './writable-label-renderer';
import filterOptions from './filter-tools/filter-options';
import { ComboBoxOption } from '../../../commons/components/combo-box/combo-box.type';
import { LunaticError } from '../../../../use-lunatic/type';

type Props = {
	id?: string;
	disabled?: boolean;
	options: ComboBoxOption[];
	onSelect: (v: string | null) => void;
	className?: string;
	value: string | null;
	label?: ReactNode;
	errors?: Record<string, LunaticError[]>;
	description?: ReactNode;
};

function DropdownWritable({
	id,
	disabled,
	options,
	onSelect,
	className,
	value,
	label,
	errors,
	description,
}: Props) {
	const [filtered, setFiltered] = useState(options);

	const onChange = useCallback(
		function (search: string | null) {
			if (search) {
				setFiltered(filterOptions(options, search));
			} else {
				setFiltered(options);
			}
			onSelect(null);
		},
		[options, onSelect]
	);

	return (
		<ComboBox
			id={id}
			className={className}
			disabled={disabled}
			options={filtered}
			onSelect={onSelect}
			onChange={onChange}
			optionRenderer={WritableOptionRenderer}
			labelRenderer={WritableLabelRenderer}
			editable={true}
			value={value}
			label={label}
			errors={errors}
			description={description}
		/>
	);
}

export default DropdownWritable;
