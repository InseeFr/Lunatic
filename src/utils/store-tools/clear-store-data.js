import { clearDb } from '../idb-tools';
import CONSTANTES from './constantes';

function clear(db) {
	clearDb(db, CONSTANTES.STORE_DATA_NAME);
}

export default clear;
