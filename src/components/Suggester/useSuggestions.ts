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
	const [search, setSearch] = useState('');
	const { search: db, index: dbIndex } = getSearchForStore(storeName);
	const dbIndexRef = useRefSync(dbIndex);
	let [options, setOptions] = useState(selectedOptions);
	const [state, setState] = useState<State>(
		db.isIndexed() ? 'success' : 'loading'
	);

	// Index the data when the component is loaded
	useEffect(() => {
		dbIndexRef
			.current()
			.then(() => {
				setState('success');
			})
			.catch((err) => {
				setState('error');
				throw new Error(err);
			});
	}, [dbIndexRef]);

	useEffectDebounced(
		() => {
			db.search(search)
				.then((r) => {
					setOptions(r);
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
			if (s.length > 0 && !isFocused) {
				setFocused(true);
			}
			// setState('loading'); // Current implementation being sync, we won't need to show a "loading" state
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
			if (!isFocused) {
				setFocused(true);
				setSearch(selectedOptions[0]?.label ?? '');
			}
		},
	};
}
