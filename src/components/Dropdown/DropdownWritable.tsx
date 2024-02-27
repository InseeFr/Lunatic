import { type ReactNode, useCallback, useState } from 'react';
import type { ComboboxOptionType } from '../shared/Combobox/ComboboxType';
import type { LunaticError } from '../../use-lunatic/type';
import { WritableOptionRenderer } from './renderer/WritableOptionRenderer';
import { WritableLabelRenderer } from './renderer/WritableLabelRenderer';
import { Combobox } from '../shared/Combobox/Combobox';
import { filterOptions } from './helpers';

type Props = {
	id?: string;
	disabled?: boolean;
	options: ComboboxOptionType[];
	onSelect: (v: string | null) => void;
	className?: string;
	value: string | null;
	label?: ReactNode;
	errors?: LunaticError[];
	description?: ReactNode;
	readOnly?: boolean;
};

export function DropdownWritable({
	id,
	disabled,
	options,
	onSelect,
	className,
	value,
	label,
	errors,
	description,
	readOnly,
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
		<Combobox
			id={id}
			className={className}
			disabled={disabled}
			readOnly={readOnly}
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
