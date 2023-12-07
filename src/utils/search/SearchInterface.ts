import type { SuggesterType } from '../../use-lunatic/type-source';

export type SearchInfo = SuggesterType;

export interface SearchInterface {
	index(data: Record<string, unknown>[]): Promise<void>;

	search(q: string): Promise<Record<string, unknown>[]>;
}
