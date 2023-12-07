import type { SearchInterface } from './SearchInterface';
import type { SearchInfo } from './SearchInterface';
import Flexsearch from 'flexsearch';

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
		return Promise.resolve(
			this._index
				.search(q, this.info.max)[0]
				.result.map((k: number) => this.data[k])
		);
	}
}
