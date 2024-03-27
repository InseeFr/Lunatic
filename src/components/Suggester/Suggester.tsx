import { useState } from 'react';
import type { LunaticComponentProps } from '../type';
import { CustomSuggester } from './CustomSuggester';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { OTHER_VALUE, useSuggestions } from './useSuggestions';
import D from '../../i18n';
import type { SuggesterOptionType } from './SuggesterType';

export function Suggester({
	storeName,
	id,
	className,
	optionRenderer,
	labelRenderer,
	handleChange,
	disabled,
	value,
	label,
	description,
	errors,
	readOnly,
	response,
	optionResponses = [],
	executeExpression,
	iteration,
	arbitrary,
	arbitraryValue,
}: LunaticComponentProps<'Suggester'>) {
	// Default options should not change between render
	// so we can break the rule of hooks here
	const [selectedOptions, setSelectedOptions] = useState<SuggesterOptionType[]>(
		() => {
			if (arbitraryValue) {
				return [{ id: 'OTHER', label: arbitraryValue, value: 'OTHER' }];
			}
			if (!value) {
				return [];
			}
			const labelResponse = optionResponses?.find(
				(o) => o.attribute === 'label'
			);
			if (!labelResponse) {
				return [{ id: value, label: value, value: value }];
			}
			const label = executeExpression(labelResponse.name, {
				iteration,
			});
			if (typeof label !== 'string') {
				return [{ id: value, label: value, value: value }];
			}
			return [
				{
					id: value,
					label: label,
					value: value,
				},
			];
		}
	);

	const { state, options, search, setSearch, onFocus, onBlur } = useSuggestions(
		{
			storeName: storeName,
			allowArbitrary: !!arbitrary,
			selectedOptions: selectedOptions,
		}
	);

	const onChange = (v: SuggesterOptionType | null) => {
		setSelectedOptions(v?.id ? [v] : []);
		// User has selected an option
		if (v?.id && v.id !== OTHER_VALUE) {
			handleChange(response, v.id);
			if (arbitrary) {
				handleChange(arbitrary.response, null);
			}
			// Update additional responses
			for (const optionResponse of optionResponses) {
				if (optionResponse.attribute in v) {
					handleChange(
						{ name: optionResponse.name },
						v[optionResponse.attribute] as string | null
					);
				}
			}
			onBlur();
			return;
		}
		// User chose an arbitrary option or clear the value
		handleChange(arbitrary.response, v?.id === OTHER_VALUE ? search : null);
		handleChange(response, null);
		for (const optionResponse of optionResponses) {
			handleChange({ name: optionResponse.name }, null);
		}
		onBlur();
	};

	let componentErrors = getComponentErrors(errors, id) ?? [];
	if (state === 'error') {
		componentErrors.push({
			id: 'suggester',
			errorMessage: D.SUGGESTER_ERROR,
			criticality: 'ERROR',
			typeOfControl: 'FORMAT',
		});
	}

	const handleSearch = (query: string) => {
		if (query === '' && selectedOptions.length > 0) {
			onChange(null);
		}
		setSearch(query);
	};

	const handleClear = () => {
		onChange(null);
		setSearch('');
	};

	return (
		<CustomSuggester
			state={state}
			id={id}
			className={className}
			optionRenderer={optionRenderer}
			labelRenderer={labelRenderer}
			options={options}
			onSelect={onChange}
			onFocus={onFocus}
			search={search}
			onSearch={handleSearch}
			onClear={handleClear}
			disabled={disabled}
			readOnly={readOnly}
			value={selectedOptions}
			label={label}
			onBlur={onBlur}
			description={description}
			errors={componentErrors}
		/>
	);
}
