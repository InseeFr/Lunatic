import type { SearchInterface } from './SearchInterface';
import type { SearchInfo } from './SearchInterface';
import Flexsearch from 'flexsearch';
import { melotoOrder } from '../suggester-workers/searching/meloto-order';

export class SearchFlexSearch implements SearchInterface {
	_index: any;
	info: SearchInfo;
	data: Record<string, unknown>[];

	constructor(info: SearchInfo) {
		this.info = info;
	}

	async index(data: Record<string, unknown>[]): Promise<void> {
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

	search(q: string): Promise<Record<string, unknown>[]> {
		if (!this._index) {
			return Promise.resolve([]);
		}
		const results = this._index.search(q, this.info.max, {
			suggest: true,
		});

		let data = results[0]?.result.map((k: number) => this.data[k]) ?? [];

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

		return Promise.resolve(data);
	}
}
