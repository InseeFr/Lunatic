/* eslint-disable no-restricted-globals */
import CONSTANTE from '../store-tools/constantes';
import createDbOpener from './create-db-opener';

function onUpgradeNeeded(e, resolve, reject) {
	try {
		e.target.onsuccess = function () {
			// Block success event!
		};
		const db = e.target.result;
		const store = db.createObjectStore(CONSTANTE.STORE_DATA_NAME, {
			keyPath: 'id',
		});
		db.createObjectStore(CONSTANTE.STORE_INFO_NAME, {
			keyPath: 'name',
		});
		store.createIndex(CONSTANTE.STORE_INDEX_NAME, 'tokens', {
			multiEntry: true,
		});

		const txn = e.target.transaction;
		txn.oncomplete = function () {
			resolve(db);
		};
	} catch (e) {
		reject(e);
	}
}

function onSuccess(e, resolve) {
	resolve(e.target.result);
}

export default createDbOpener({ onUpgradeNeeded, onSuccess });
