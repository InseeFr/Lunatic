import type { SuggesterType } from '../../use-lunatic/type-source';
import IndexedDBStore from '../../constants/indexedDBStore';
import openStorage from './open-or-create-store';
import clearStore from '../idb-tools/clear-store';
import insertEntity from '../idb-tools/insert-entity';

export async function initStore(storeInfo: SuggesterType): Promise<boolean> {
	const { version, name } = storeInfo;
	const db = await openStorage(name, version);
	if (db) {
		const a = await clearStore(db, IndexedDBStore.STORE_DATA_NAME);
		const b = await clearStore(db, IndexedDBStore.STORE_INFO_NAME);
		const c = await insertEntity<SuggesterType>(
			db,
			IndexedDBStore.STORE_INFO_NAME,
			storeInfo
		);
		db.close();
		return a && b && c;
	}
	return false;
}
