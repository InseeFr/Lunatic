import { type ReactNode, useMemo, useRef } from 'react';
import type { LunaticComponentProps } from '../type';
import { CustomSuggester } from './CustomSuggester';
import { createSearching } from './helpers';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import type { SuggesterOptionType } from './SuggesterType';
import { SuggesterNotification } from './SuggesterNotification';
import { SuggesterStatus } from '../../use-lunatic/use-suggesters';
import { Input } from '../Input/Input';

type SearchResult = { results: SuggesterOptionType[]; search: string };
const OTHER_VALUE = 'OTHER';

export function Suggester({
	storeName,
	idbVersion = '1',
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
	workersBasePath,
	getSuggesterStatus,
	response,
	optionResponses = [],
	executeExpression,
	iteration,
	arbitrary,
}: LunaticComponentProps<'Suggester'>) {
	const { status: suggesterStatus } = getSuggesterStatus(storeName);
	// Remember the last search done before the suggester is loaded
	const lastSearch =
		useRef<[search: string | null, (v: SearchResult) => void]>();
	const isReady = suggesterStatus === SuggesterStatus.success;
	const isError = suggesterStatus === SuggesterStatus.error;
	const arbitraryValue = arbitrary?.response
		? executeExpression(arbitrary.response.name, {
				iteration,
			})
		: null;

	const onChange = (
		v: string | null | { id?: string; [key: string]: ReactNode }
	) => {
		if (v && typeof v === 'object' && optionResponses) {
			if (v.id) {
				handleChange(response, v.id);
			}
			if (arbitrary && v.id !== OTHER_VALUE && arbitraryValue) {
				handleChange(arbitrary.response, null);
			}
			for (const optionResponse of optionResponses) {
				if (optionResponse.attribute in v) {
					handleChange(
						{ name: optionResponse.name },
						v[optionResponse.attribute] as string | null
					);
				}
			}
		} else {
			handleChange(response, v as string | null);
			if (arbitrary && v !== OTHER_VALUE && arbitraryValue) {
				handleChange(arbitrary.response, null);
			}
		}
	};

	const searching = useMemo(
		function () {
			if (!isReady) {
				// While waiting for the search to be ready, remember the last search done
				return (name: string | null) => {
					return new Promise<SearchResult>((resolve) => {
						lastSearch.current = [name, resolve];
					});
				};
			}
			const searching = createSearching(storeName, idbVersion, workersBasePath);
			// Solve the last pending search
			const pendingSearch = lastSearch.current;
			if (pendingSearch && pendingSearch[0]) {
				searching(pendingSearch[0]).then((r) => pendingSearch[1](r));
				lastSearch.current = undefined;
			}
			return (q: string | null) => {
				return searching(q).then((r) => ({
					...r,
					results: [...r.results, ...arbitraryOptions],
				}));
			};
		},
		[isReady, storeName, idbVersion, workersBasePath]
	);

	const arbitraryOptions = arbitrary
		? [
				{
					id: OTHER_VALUE,
					label: arbitrary.label,
					value: OTHER_VALUE,
				},
			]
		: [];

	// Default options should not change between render
	// so we can break the rule of hooks here
	const defaultOptions = useMemo(() => {
		if (!value) {
			return [...arbitraryOptions];
		}
		const labelResponse = optionResponses?.find((o) => o.attribute === 'label');
		if (!labelResponse) {
			return [{ id: value, label: value, value: value }, ...arbitraryOptions];
		}
		const label = executeExpression(labelResponse.name, {
			iteration,
		});
		if (typeof label !== 'string') {
			return [{ id: value, label: value, value: value }, ...arbitraryOptions];
		}
		return [
			{
				id: value,
				label: label,
				value: value,
			},
			...arbitraryOptions,
		];
	}, []);

	if (isError) {
		return (
			<SuggesterNotification
				status="Error"
				storeName={storeName}
				label={label}
				description={description}
			/>
		);
	}

	return (
		<>
			<CustomSuggester
				id={id}
				className={className}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				defaultOptions={defaultOptions}
				onSelect={onChange}
				searching={searching}
				disabled={disabled}
				readOnly={readOnly}
				value={value}
				label={label}
				description={description}
				errors={getComponentErrors(errors, id)}
			/>
			{value === OTHER_VALUE && (
				<Input
					id={`arbitrary-${id}`}
					handleChange={handleChange}
					value={executeExpression(arbitrary.response.name)}
					label={arbitrary.inputLabel}
					response={arbitrary.response}
				/>
			)}
		</>
	);
}
