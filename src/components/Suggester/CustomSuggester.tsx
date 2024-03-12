import { type ReactNode, useCallback, useState, useRef } from 'react';
import { voidFunction } from '../../utils/function';
import type { LunaticError } from '../../use-lunatic/type';
import type { LunaticComponentProps } from '../type';
import D from '../../i18n';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { ComboboxOptionType } from '../shared/Combobox/ComboboxType';
import { Combobox } from '../shared/Combobox/Combobox';
import type { SuggesterOptionType } from './SuggesterType';

type Props = {
	className?: string;
	classNamePrefix?: string;
	placeholder?: string;
	onSelect: (
		option: string | null | { id?: string; [key: string]: ReactNode }
	) => void;
	value: string | null;
	labelRenderer: LunaticComponentProps<'Suggester'>['labelRenderer'];
	optionRenderer: LunaticComponentProps<'Suggester'>['optionRenderer'];
	disabled?: boolean;
	readOnly?: boolean;
	id?: string;
	searching?: (
		s: string | null
	) => Promise<{ results: SuggesterOptionType[]; search: string }>;
	label?: ReactNode;
	description?: ReactNode;
	errors?: LunaticError[];
	defaultOptions?: SuggesterOptionType[];
};

export const CustomSuggester = slottableComponent<Props>(
	'Suggester',
	({
		className,
		classNamePrefix = 'lunatic',
		placeholder = D.PLACEHOLDER,
		onSelect = voidFunction,
		labelRenderer,
		optionRenderer,
		value,
		disabled,
		readOnly,
		id,
		searching,
		label,
		description,
		errors,
		defaultOptions,
	}) => {
		const [search, setSearch] = useState('');
		const [options, setOptions] = useState<Array<ComboboxOptionType>>(
			defaultOptions ?? []
		);
		const lastSearch = useRef('');

		const handleSelect = useCallback(
			(id: string | null) => {
				onSelect(id ? options.find((o) => o.id === id)! : null);
			},
			[onSelect]
		);

		const handleChange = useCallback(
			async function (search: string | null) {
				lastSearch.current = search ?? '';
				if (search && typeof searching === 'function') {
					const { results, search: previous } = await searching(search);
					if (previous === lastSearch.current) {
						setOptions(results);
						setSearch(search);
						// if a user does not select an option in the list, their search term is saved
						onSelect(search);
					}
				} else {
					setOptions(defaultOptions ?? []);
					onSelect(null);
					setSearch('');
				}
			},
			[searching, onSelect]
		);

		const defaultSearch = getSearch(search, value);

		return (
			<Combobox
				id={id}
				className={className}
				classNamePrefix={classNamePrefix}
				onChange={handleChange}
				disabled={disabled}
				readOnly={readOnly}
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
);

function getSearch(search: string, value: string | null) {
	if (!search.length && value) {
		return value;
	}

	return '';
}
