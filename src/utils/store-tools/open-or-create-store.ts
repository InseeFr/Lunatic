/* eslint-disable no-restricted-globals */
import CONSTANTE from './constantes';
import getIDB from '../idb-tools/get-idb';

function openStorage(name: string, idbVersion = 1): Promise<IDBDatabase> {
	return new Promise(function (resolve, reject) {
		const idb = getIDB();
		if (!idb) {
			reject('indexedDb not supported !');
		}
		const request = idb.open(name, idbVersion);
		let db: IDBDatabase;
		let doIt = true;

		request.onupgradeneeded = function (e) {
			doIt = false;
			db = this.result;
			const store = db.createObjectStore(CONSTANTE.STORE_DATA_NAME, {
				keyPath: 'id',
			});
			db.createObjectStore(CONSTANTE.STORE_INFO_NAME, {
				keyPath: 'name',
			});
			store.createIndex(CONSTANTE.STORE_INDEX_NAME, 'tokens', {
				multiEntry: true,
			});

			const txn = this.transaction;
			if (txn) {
				txn.oncomplete = function () {
					resolve(db);
				};
			}
		};

		request.onsuccess = function () {
			if (doIt) {
				resolve(request.result);
			}
		};

		request.onerror = function (e) {
			reject(e);
		};
	});
}

export default openStorage;
