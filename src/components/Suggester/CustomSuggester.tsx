import { type ReactNode } from 'react';
import { voidFunction } from '../../utils/function';
import type { LunaticError } from '../../use-lunatic/type';
import type { LunaticComponentProps } from '../type';
import D from '../../i18n';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Combobox } from '../shared/Combobox/Combobox';
import type { SuggesterOptionType } from './SuggesterType';

type Props = {
	className?: string;
	classNamePrefix?: string;
	placeholder?: string;
	onSelect: (option: SuggesterOptionType | null) => void;
	onBlur: () => void;
	onFocus: () => void;
	value: { id?: string; [key: string]: ReactNode }[];
	labelRenderer: LunaticComponentProps<'Suggester'>['labelRenderer'];
	optionRenderer: LunaticComponentProps<'Suggester'>['optionRenderer'];
	disabled?: boolean;
	readOnly?: boolean;
	id?: string;
	label?: ReactNode;
	description?: ReactNode;
	errors?: LunaticError[];
	options: SuggesterOptionType[];
	onSearch: (s: string) => void;
	onClear: () => void;
	search: string;
	state: 'loading' | 'error' | 'success';
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
		search,
		label,
		description,
		errors,
		options,
		onSearch,
		onBlur,
		onClear,
		state,
		onFocus,
	}) => {
		const handleSelect = (id: string | null) => {
			if (id === null) {
				onClear();
			} else {
				onSelect(options.find((o) => o.id === id) ?? null);
			}
		};

		return (
			<Combobox
				id={id}
				isLoading={state === 'loading'}
				className={className}
				classNamePrefix={classNamePrefix}
				onChange={(v) => onSearch(v ?? '')}
				disabled={disabled}
				readOnly={readOnly}
				options={options.map((o) => ({ value: o.id, ...o }))}
				editable={true}
				onBlur={onBlur}
				onFocus={onFocus}
				onSelect={handleSelect}
				value={value[0]?.id ?? ''}
				search={search}
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
