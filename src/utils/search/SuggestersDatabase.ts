import { SearchMinisearch } from './SearchMinisearch';
import type { IndexEntry, SearchInterface } from './SearchInterface';
import type { LunaticSource } from '../../use-lunatic/type';

const suggesters = new Map<string, SearchInterface<IndexEntry>>();
let dataFetcher = (_: string): Promise<Array<IndexEntry>> =>
	Promise.resolve([]);

/**
 * This file retains a dictionary of all the search indexed by storeName
 */
export function registerSuggesters(
	infos: LunaticSource['suggesters'],
	fetcher: (name: string) => Promise<Array<IndexEntry>>
) {
	if (!infos) {
		return;
	}
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
