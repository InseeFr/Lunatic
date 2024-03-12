import type { SuggesterType } from '../../use-lunatic/type-source';

export type SearchInfo = SuggesterType;

export type IndexEntry = { id: string; label?: string };

export interface SearchInterface<T extends IndexEntry> {
	index(data: T[]): Promise<void>;

	search(q: string): Promise<T[]>;
}
