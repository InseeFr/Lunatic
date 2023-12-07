import type {
	IndexEntry,
	SearchInfo,
	SearchInterface,
} from './SearchInterface';
// @ts-ignore
import { tokenizer as defaultTokenizer } from '@orama/orama/components';
import { applyMelauto } from './melauto';
import MiniSearch from 'minisearch';

export class SearchMinisearch<T extends IndexEntry>
	implements SearchInterface<T>
{
	db: MiniSearch | null = null;
	info: SearchInfo;

	constructor(info: SearchInfo) {
		this.info = info;
	}

	async index(data: Record<string, unknown>[]): Promise<void> {
		this.db = new MiniSearch({
			fields: ['id'],
			storeFields: ['id'],
		});
		this.db.addAll(data);
	}

	async search(q: string): Promise<T[]> {
		if (!this.db) {
			return [];
		}
		let data = this.db.search(q, {
			prefix: true,
		});

		console.log(data);

		// Apply meloto on top
		if (this.info.meloto) {
			data = applyMelauto(q, data);
		}

		data = data.slice(0, this.info.max);

		return data;
	}
}
