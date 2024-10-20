import { useEffect, useState } from 'react';
import type { SuggesterOptionType } from './SuggesterType';
import { useEffectDebounced } from '../../hooks/useDebounce';
import { getSearchForStore } from '../../utils/search/SuggestersDatabase';
import { useRefSync } from '../../hooks/useRefSync';

type Props = {
	storeName: string;
	selectedOptions: SuggesterOptionType[];
	allowArbitrary: boolean;
};

export const OTHER_VALUE = 'OTHER';

type State = 'success' | 'loading' | 'error';

export function useSuggestions({
	storeName,
	selectedOptions,
	allowArbitrary,
}: Props) {
	const [searchQuery, setSearchQuery] = useState('');
	const store = getSearchForStore(storeName);
	const searchIndexRef = useRefSync(store.index);
	// eslint-disable-next-line prefer-const
	let [options, setOptions] = useState(selectedOptions);
	const [state, setState] = useState<State>(
		store.error !== null
			? 'error'
			: store.search.isIndexed()
				? 'success'
				: 'loading'
	);

	// Index the data when the component is loaded
	useEffect(() => {
		if (!searchIndexRef.current) {
			return;
		}
		searchIndexRef
			.current()
			.then(() => {
				setState('success');
			})
			.catch(() => {
				setState('error');
			});
	}, [searchIndexRef]);

	useEffectDebounced(
		() => {
			// Do not reset search for empty search
			if (!searchQuery) {
				return;
			}
			store.search
				?.search(searchQuery)
				.then((r) => {
					setOptions(r);
					setState('success');
				})
				.catch(() => setState('error'));
		},
		[searchQuery],
		300
	);

	if (
		searchQuery &&
		allowArbitrary &&
		options.length === 0 &&
		state !== 'loading'
	) {
		options = [
			{
				id: OTHER_VALUE,
				label: searchQuery,
				value: OTHER_VALUE,
			},
		];
	}

	// Since the underlying implementation of onFocus / onBlur can be wrong, ensure we don't call focus / blur handler multiple times
	const [isFocused, setFocused] = useState(false);

	return {
		search: searchQuery,
		setSearch: (s: string) => {
			if (s.length > 0 && !isFocused) {
				setFocused(true);
			}
			// setState('loading'); // Current implementation being sync, we won't need to show a "loading" state
			setSearchQuery(s);
		},
		state,
		options: isFocused ? options : selectedOptions,
		onBlur: () => {
			setFocused(false);
			setSearchQuery('');
			// Prevent extra calls
			if (!isFocused) {
				return;
			}
			setOptions(selectedOptions);
		},
		onFocus: () => {
			if (!isFocused) {
				setFocused(true);
				setSearchQuery(selectedOptions[0]?.label ?? '');
			}
		},
	};
}
