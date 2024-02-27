import { clearDb } from '../idb-tools';
import IndexedDBStore from '../../constants/indexedDBStore';

async function clear(db: IDBDatabase) {
	await clearDb(db, IndexedDBStore.STORE_INFO_NAME);
}

export default clear;
