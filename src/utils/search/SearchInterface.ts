import type { LunaticSuggester } from '../../use-lunatic/type';

export type SearchInfo = LunaticSuggester;

export type IndexEntry = {
	id: string;
	label: string;
	/**
	 * Score computed by MiniSearch algo
	 */
	score: number;

	/**
	 * Score compute by melauto algo
	 */
	melautoScore: number;
	[k: string]: any;
};

export interface SearchInterface<T extends IndexEntry> {
	isIndexed(): boolean;

	index(data: T[]): Promise<void>;

	search(q: string): Promise<T[]>;

	getFieldsById(id: any): T;
}
