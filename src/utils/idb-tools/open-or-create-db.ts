/* eslint-disable no-restricted-globals */
import CONSTANTE from '../store-tools/constantes';
import createDbOpener from './create-db-opener';

function onUpgradeNeeded(
	e: IDBVersionChangeEvent & {
		target: IDBOpenDBRequest;
	},
	resolve: (v: IDBDatabase) => void,
	reject: (v: any) => void
) {
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
		if (txn) {
			txn.oncomplete = function () {
				resolve(db);
			};
		}
	} catch (e) {
		reject(e);
	}
}

function onSuccess(
	e: Event & { target: { result: IDBDatabase } },
	resolve: (v: IDBDatabase) => void
) {
	resolve(e.target.result);
}

export default createDbOpener({ onUpgradeNeeded, onSuccess });
