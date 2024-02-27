import type {
	IndexEntry,
	SearchInfo,
	SearchInterface,
} from './SearchInterface';
import { create, insertMultiple, search } from '@orama/orama';
// @ts-ignore
import { tokenizer as defaultTokenizer } from '@orama/orama/components';
import { applyMelauto } from './melauto';

export class SearchOrama<T extends IndexEntry> implements SearchInterface<T> {
	db: any;
	info: SearchInfo;

	constructor(info: SearchInfo) {
		this.info = info;
	}

	async index(data: Record<string, unknown>[]): Promise<void> {
		this.db = await create({
			schema: this.info.fields.reduce((acc, { name }) => ({...acc,[name]:"string"}), {})
			,
			components: {
				tokenizer: await defaultTokenizer.createTokenizer({
					language: 'french',
					stemming: this.info.fields[0].stemmer,
				}),
			},
		});
		await insertMultiple(this.db, data);
	}

	async search(q: string): Promise<T[]> {
		if (!this.db) {
			return [];
		}
		let data = (
			await search(this.db, {
				term: q,
				limit: this.info.max ?? 100,
			})
		).hits.map((h) => h.document) as T[];

		// Apply meloto on top
		if (this.info.meloto) {
			data = applyMelauto(q, data);
		}

		return data;
	}
}
