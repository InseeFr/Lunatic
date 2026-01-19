import { useEffect, useState } from 'react';
import type { LunaticComponentProps } from '../type';
import { CustomSuggester } from './CustomSuggester';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { OTHER_VALUE, useStore, useSuggestions } from './useSuggestions';
import D from '../../i18n';
import type { SuggesterOptionType } from './SuggesterType';

export function Suggester(props: LunaticComponentProps<'Suggester'>) {
	const { id, iteration } = props;

	// We can have the same id (same variable) for different iterations in successive pages, we need to have unique key for remount correctly
	const suggesterKey = `${id}-${iteration}`;

	return <WrappedSuggester {...props} key={suggesterKey} />;
}

export function WrappedSuggester({
	storeName,
	id,
	className,
	optionRenderer,
	labelRenderer,
	handleChanges,
	disabled,
	value,
	label,
	declarations,
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
	const { store, storeState, setStoreState, getLabelById } = useStore({
		storeName,
	});

	// Default options should not change between render
	// so we can break the rule of hooks here
	const computeSelectedOptions = (): [SuggesterOptionType] | [] => {
		if (arbitraryValue) {
			return [{ id: 'OTHER', label: arbitraryValue, value: 'OTHER' }];
		}
		if (!value) {
			return [];
		}
		const labelResponse = optionResponses?.find((o) => o.attribute === 'label');
		if (!labelResponse) {
			return [{ id: value, label: getLabelById(value), value: value }];
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
	};

	const [selectedOptions, setSelectedOptions] = useState<
		[SuggesterOptionType] | []
	>(computeSelectedOptions);

	const { state, options, search, setSearch, onFocus, onBlur } = useSuggestions(
		{
			store,
			storeState,
			setStoreState,
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
		if (arbitrary?.response) {
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

	const componentErrors = getComponentErrors(errors, id) ?? [];
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

	useEffect(() => {
		// Fix display issue (when handleChanges is called outside this component (in management mode, return to FORCED value by example)
		// "value" does'nt match selectedOption's "id"
		if (value && selectedOptions[0]?.id !== value) {
			const actualSelection = computeSelectedOptions();
			const selectedOptionsWithLabel = [
				{
					...actualSelection[0],
					label: getLabelById(actualSelection[0]?.id),
				},
			] as [SuggesterOptionType];
			setSelectedOptions(selectedOptionsWithLabel);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

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
			declarations={declarations}
			description={description}
			errors={componentErrors}
		/>
	);
}
