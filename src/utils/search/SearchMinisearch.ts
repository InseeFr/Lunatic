import type {
	IndexEntry,
	SearchInfo,
	SearchInterface,
} from './SearchInterface';
// @ts-ignore
import { applyMelauto } from './melauto';
import MiniSearch from 'minisearch';

const tokenizer = (str: string) =>
	str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter((w) => w.length > 0);

export class SearchMinisearch<T extends IndexEntry>
	implements SearchInterface<T>
{
	db: MiniSearch | null = null;
	info: SearchInfo;

	constructor(info: SearchInfo) {
		this.info = info;
	}

	async index(data: Record<string, unknown>[]): Promise<void> {
		const nameFields = this.info.fields.map(({ name }) => name);
		this.db = new MiniSearch({
			fields: nameFields,
			storeFields: nameFields,
			tokenize: tokenizer,
		});
		this.db.addAll(data);
	}

	async search(q: string): Promise<T[]> {
		if (!this.db) {
			return [];
		}
		let data = this.db.search(q, {
			prefix: (term) => term.length > 2,
		}) as any as T[];

		// Apply melauto to classify results
		data = applyMelauto(q, data);

		data = data.slice(0, this.info.max);

		return data;
	}
}
