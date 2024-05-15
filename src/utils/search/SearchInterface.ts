import type { LunaticSuggester } from '../../use-lunatic/type';

export type SearchInfo = LunaticSuggester;

export type IndexEntry = {
	id: string;
	label: string;
	[k: string]: string;
};

export interface SearchInterface<T extends IndexEntry> {
	isIndexed(): boolean;

	index(data: T[]): Promise<void>;

	search(q: string): Promise<T[]>;
}
