import type { SuggesterType } from '../../use-lunatic/type-source';
import { SearchMinisearch } from './SearchMinisearch';
import type { IndexEntry, SearchInterface } from './SearchInterface';

const suggesters = new Map<string, SearchInterface<IndexEntry>>();
let dataFetcher = (_: string): Promise<Array<IndexEntry>> =>
	Promise.resolve([]);

/**
 * This file retains a dictionary of all the search indexed by storeName
 */
export function registerSuggesters(
	infos: SuggesterType[],
	fetcher: (name: string) => Promise<Array<IndexEntry>>
) {
	dataFetcher = fetcher;
	for (const suggester of infos) {
		suggesters.set(suggester.name, new SearchMinisearch<IndexEntry>(suggester));
	}
}

export function getSearchForStore(storeName: string) {
	const search = suggesters.get(storeName);
	if (!search) {
		return {
			error: 'Cannot find search for store : ' + storeName,
		};
	}
	return {
		error: null,
		search,
		index: () => {
			if (!search) {
				return Promise.reject();
			}
			if (search.isIndexed()) {
				return Promise.resolve();
			}
			return dataFetcher(storeName).then((data) => search.index(data));
		},
	};
}
