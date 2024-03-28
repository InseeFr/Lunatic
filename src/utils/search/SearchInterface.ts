import type { SuggesterType } from '../../use-lunatic/type-source';

export type SearchInfo = SuggesterType;

export type IndexEntry = {
	id: string;
	label: string;
	value: string;
	[k: string]: string;
};

export interface SearchInterface<T extends IndexEntry> {
	isIndexed(): boolean;

	index(data: T[]): Promise<void>;

	search(q: string): Promise<T[]>;
}
