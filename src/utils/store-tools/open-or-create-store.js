/* eslint-disable no-restricted-globals */
import CONSTANTE from './constantes';
import { getIDB } from '../idb-tools';

const IDB_REF = getIDB();

function openStorage(name, idbVersion = 1) {
	return new Promise(function (resolve, reject) {
		if (!IDB_REF) {
			reject('indexedDb not supported !');
		}
		const request = IDB_REF.open(name, idbVersion);
		let db;
		let doIt = true;

		request.onupgradeneeded = function (e) {
			doIt = false;
			db = e.target.result;
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
