import React, { useCallback, useState } from 'react';
import { ComboBox } from '../../../commons';
import WritableOptionRenderer from './writable-option-renderer';
import WritableLabelRenderer from './writable-label-renderer';
import filterOptions from './filter-tools/filter-options';

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
}) {
	const [filtered, setFiltered] = useState(options);

	const onChange = useCallback(
		function (search) {
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
