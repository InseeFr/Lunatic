import { clearDb } from '../../idb-tools';
import IndexedDBStore from '../../../constants/indexedDBStore';
import openOrCreateStore from '../open-or-create-store';
import updateStoreInfo from './update-store-info';

async function create(storeInfo: { name: string }, idbVersion?: number) {
	const { name } = storeInfo;
	try {
		const db = await openOrCreateStore(name, idbVersion);
		await clearDb(db, IndexedDBStore.STORE_INFO_NAME);
		await updateStoreInfo(db, storeInfo);

		return db;
	} catch (e) {
		throw e;
	}
}

export default create;
