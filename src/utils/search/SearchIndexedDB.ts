import type { SearchInterface } from './SearchInterface';
import { clearDb, insertEntity, openOnCreateDb } from '../idb-tools';
import append from '../suggester-workers/append-to-index';
import { CONSTANTES } from '../../utils/store-tools';
// @ts-ignore
import searching from '../../utils/suggester-workers/searching';

export class SearchIndexedDB implements SearchInterface {
	info: any;

	constructor(info: any) {
		this.info = info;
	}

	async index(data: Record<string, unknown>[]): Promise<void> {
		const db = await openOnCreateDb(this.info.name);
		await clearDb(db, CONSTANTES.STORE_DATA_NAME);
		await clearDb(db, CONSTANTES.STORE_INFO_NAME);
		await append(this.info, this.info.version, data, (() => {}) as any);
		await insertEntity(db, CONSTANTES.STORE_INFO_NAME, this.info);
	}

	search(q: string): Promise<Record<string, unknown>[]> {
		return searching(q, this.info).then((r) => r.results);
	}
}
