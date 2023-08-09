import React, { ReactNode, useCallback, useState } from 'react';
import { ComboBox, createCustomizableLunaticField } from '../../commons';
import './default-style.scss';
import { voidFunction } from '../../../utils/function';
import { LunaticError } from '../../../use-lunatic/type';
import { ComboBoxOptionType } from '../../commons/components/combo-box/combo-box.type';
import { LunaticComponentProps } from '../../type';
import D from '../../../i18n';

type Props = {
	className?: string;
	placeholder?: string;
	onSelect?: (s: string | null) => void;
	value: string | null;
	labelRenderer: LunaticComponentProps<'Suggester'>['labelRenderer'];
	optionRenderer: LunaticComponentProps<'Suggester'>['optionRenderer'];
	disabled?: boolean;
	id?: string;
	searching?: (s: string | null) => Promise<{ results: ComboBoxOptionType[] }>;
	label?: ReactNode;
	description?: ReactNode;
	errors?: Record<string, LunaticError[]>;
};

function Suggester({
	className = 'lunatic-suggester-default-style',
	placeholder = D.PLACEHOLDER,
	onSelect = voidFunction,
	labelRenderer,
	optionRenderer,
	value,
	disabled,
	id,
	searching,
	label,
	description,
	errors,
}: Props) {
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState<Array<ComboBoxOptionType>>([]);

	const handleSelect = useCallback(
		function (id: string | null) {
			onSelect(id ? id : null);
		},
		[onSelect]
	);

	const handleChange = useCallback(
		async function (search: string | null) {
			if (search && typeof searching === 'function') {
				const { results } = await searching(search);
				setOptions(results);
				setSearch(search);
			} else {
				setOptions([]);
				onSelect(null);
				setSearch('');
			}
		},
		[searching, onSelect]
	);

	const defaultSearch = getSearch(search, value);

	return (
		<ComboBox
			id={id}
			className={className}
			onChange={handleChange}
			disabled={disabled}
			options={options}
			editable={true}
			onSelect={handleSelect}
			value={value}
			search={defaultSearch}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			placeholder={placeholder}
			label={label}
			description={description}
			errors={errors}
		/>
	);
}

function getSearch(search: string, value: string | null) {
	if (!search.length && value) {
		return value;
	}

	return '';
}

export default createCustomizableLunaticField(Suggester, 'Suggester');
