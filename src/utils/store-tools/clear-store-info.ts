import { clearDb } from '../idb-tools';
import CONSTANTES from './constantes';

async function clear(db: IDBDatabase) {
	await clearDb(db, CONSTANTES.STORE_INFO_NAME);
}

export default clear;
