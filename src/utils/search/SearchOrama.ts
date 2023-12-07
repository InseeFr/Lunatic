import type { SearchInfo, SearchInterface } from './SearchInterface';
import { create, insertMultiple, search } from '@orama/orama';
import { tokenizer as defaultTokenizer } from '@orama/orama/components';
import { melotoOrder } from '../suggester-workers/searching/meloto-order';

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
			components: {
				tokenizer: await defaultTokenizer.createTokenizer({
					language: 'french',
					stemming: this.info.fields[0].stemmer,
				}),
			},
		});
		await insertMultiple(this.db, data);
	}

	async search(q: string): Promise<Record<string, unknown>[]> {
		if (!this.db) {
			return [];
		}
		let data = (
			await search(this.db, {
				term: q,
				limit: this.info.max ?? 100,
			})
		).hits.map((h) => h.document) as { id: string }[];

		// Apply meloto on top
		if (this.info.meloto) {
			data = melotoOrder(
				data.map((d) => ({
					id: d.id,
					suggestion: { id: d.id },
					tokensSearch: {},
				})),
				q.split(' '),
				true
			).map((r) => r.suggestion);
		}

		return data;
	}
}
