import type { SuggesterType } from '../../use-lunatic/type-source';
import CONSTANTES from './constantes';
import openStorage from './open-or-create-store';
import clearStore from '../idb-tools/clear-store';
import insertEntity from '../idb-tools/insert-entity';

export async function initStore(storeInfo: SuggesterType): Promise<boolean> {
	const { version, name } = storeInfo;
	const db = await openStorage(name, version);
	if (db) {
		const a = await clearStore(db, CONSTANTES.STORE_DATA_NAME);
		const b = await clearStore(db, CONSTANTES.STORE_INFO_NAME);
		const c = await insertEntity<SuggesterType>(
			db,
			CONSTANTES.STORE_INFO_NAME,
			storeInfo
		);
		db.close();
		return a && b && c;
	}
	return false;
}
