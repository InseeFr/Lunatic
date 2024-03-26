import { useMemo, useRef, useState } from 'react';
import { createSearching } from './helpers';
import type { SuggesterOptionType } from './SuggesterType';
import { useEffectDebounced } from '../../hooks/useDebounce';
import { SuggesterStatus } from '../../use-lunatic/use-suggesters';

type Props = {
	indexStatus: SuggesterStatus;
	storeName: string;
	idbVersion: string;
	workersBasePath?: string;
	selectedOptions: SuggesterOptionType[];
	allowArbitrary: boolean;
};

export const OTHER_VALUE = 'OTHER';

type SearchResult = { results: SuggesterOptionType[]; search: string };

const getStateFromSuggesterStatus = (
	suggesterStatus: SuggesterStatus
): 'success' | 'loading' | 'error' => {
	if (
		suggesterStatus === SuggesterStatus.error ||
		suggesterStatus === SuggesterStatus.unknown
	) {
		return 'error';
	}
	return 'success';
};

export function useSuggestions({
	indexStatus,
	storeName,
	idbVersion,
	workersBasePath,
	selectedOptions,
	allowArbitrary,
}: Props) {
	const [search, setSearch] = useState('');
	const isReady = indexStatus === SuggesterStatus.success;
	const lastSearch =
		useRef<[search: string | null, (v: SearchResult) => void]>();
	const [state, setState] = useState(getStateFromSuggesterStatus(indexStatus));
	let [options, setOptions] = useState(selectedOptions);

	const searching = useMemo(() => {
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
		return searching;
	}, [isReady, storeName, idbVersion, workersBasePath]);

	useEffectDebounced(
		() => {
			searching?.(search)
				.then((r) => {
					setOptions(r.results);
					setState('success');
				})
				.catch(() => setState('error'));
		},
		[search],
		300
	);

	if (search && allowArbitrary && options.length === 0 && state === 'success') {
		options = [
			{
				id: OTHER_VALUE,
				label: search,
				value: OTHER_VALUE,
			},
		];
	}

	// Since the underlying implementation of onFocus / onBlur can be wrong, ensure we don't call focus / blur handler multiple times
	const [isFocused, setFocused] = useState(false);

	return {
		search,
		setSearch: (s: string) => {
			if (state === 'error') {
				return;
			}
			setState('loading');
			setSearch(s);
		},
		state,
		options: isFocused ? options : selectedOptions,
		onBlur: () => {
			setFocused(false);
			setSearch('');
			// Prevent extra calls
			if (!isFocused) {
				return;
			}
			setOptions(selectedOptions);
		},
		onFocus: () => {
			setFocused(true);
			setSearch(selectedOptions[0]?.label ?? '');
		},
	};
}
