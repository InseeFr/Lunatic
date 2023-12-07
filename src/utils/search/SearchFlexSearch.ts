import type { IndexEntry, SearchInterface } from './SearchInterface';
import type { SearchInfo } from './SearchInterface';
// @ts-ignore
import Flexsearch from 'flexsearch';
import { applyMelauto } from './melauto';

export class SearchFlexSearch<T extends IndexEntry>
	implements SearchInterface<T>
{
	_index: any;
	info: SearchInfo;
	data: T[] = [];

	constructor(info: SearchInfo) {
		this.info = info;
	}

	async index(data: T[]): Promise<void> {
		// @ts-ignore
		this._index = new Flexsearch.Document({
			index: ['id'],
			// Enable partial matching
			tokenize: 'forward',
		});
		data.map((row, k) => {
			this._index.add(k, row);
		});
		this.data = data;
	}

	search(q: string): Promise<T[]> {
		if (!this._index) {
			return Promise.resolve([]);
		}
		const results = this._index.search(q, this.info.max, {
			suggest: true,
		});

		let data = results[0]?.result.map((k: number) => this.data[k]) ?? [];

		// Apply meloto on top
		if (this.info.meloto) {
			data = applyMelauto(q, data);
		}

		return Promise.resolve(data);
	}
}
