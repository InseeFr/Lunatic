/* eslint-disable no-restricted-globals */
import getIDB from '../idb-tools/get-idb';
import {
	STORE_DATA_NAME,
	STORE_INDEX_NAME,
	STORE_INFO_NAME,
} from '../../constants/indexedDBStore';

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
			const store = db.createObjectStore(STORE_DATA_NAME, {
				keyPath: 'id',
			});
			db.createObjectStore(STORE_INFO_NAME, {
				keyPath: 'name',
			});
			store.createIndex(STORE_INDEX_NAME, 'tokens', {
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
