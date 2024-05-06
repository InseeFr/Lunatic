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
	handleChanges,
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
			const label = executeExpression(
				{ value: labelResponse.name, type: 'VTL' },
				{
					iteration,
				}
			);
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
			const newResponses: Parameters<typeof handleChanges>[0] = [
				{ name: response.name, value: v.id },
			];
			if (arbitrary) {
				newResponses.push({
					name: arbitrary.response.name,
					value: null,
				});
			}
			// Update additional responses
			for (const optionResponse of optionResponses) {
				if (optionResponse.attribute in v) {
					newResponses.push({
						name: optionResponse.name,
						value: v[optionResponse.attribute],
					});
				}
			}
			handleChanges(newResponses);
			return;
		}

		// Use has selected the arbitrary value
		const newResponses: Parameters<typeof handleChanges>[0] = [
			{ name: response.name, value: null },
		];
		// User chose an arbitrary option or clear the value
		if (arbitrary && arbitrary.response) {
			newResponses.push({
				name: arbitrary.response.name,
				value: v?.id === OTHER_VALUE ? search : null,
			});
		}
		for (const optionResponse of optionResponses) {
			newResponses.push({ name: optionResponse.name, value: null });
		}
		handleChanges(newResponses);
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
