import { clearDb } from '../idb-tools';
import CONSTANTES from './constantes';

async function clear(db) {
	await clearDb(db, CONSTANTES.STORE_DATA_NAME);
}

export default clear;
