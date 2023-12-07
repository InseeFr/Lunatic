import type { SearchInfo, SearchInterface } from './SearchInterface';
import { create, insertMultiple, search } from '@orama/orama';

export class SearchOrama implements SearchInterface {
	db: any;
	info: SearchInfo;

	constructor(info: SearchInfo) {
		this.info = info;
	}

	async index(data: Record<string, unknown>[]): Promise<void> {
		this.db = await create({
			schema: {
				id: 'string',
			},
		});
		await insertMultiple(this.db, data);
	}

	async search(q: string): Promise<Record<string, unknown>[]> {
		if (!this.db) {
			return [];
		}
		const data = await search(this.db, {
			term: q,
			limit: this.info.max ?? 100,
		});
		return data.hits.map((h) => h.document) as Record<string, unknown>[];
	}
}
