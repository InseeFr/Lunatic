/* eslint-disable no-restricted-globals */
import getIDB from './get-idb';

const IDB_REF = getIDB();

function createOpenDb(
	onSuccess: (
		resolve: unknown,
		reject: unknown
	) => (this: IDBRequest, e: Event) => void,
	onUpgradeNeeded: (
		resolve: unknown,
		reject: unknown
	) => (this: IDBRequest, e: IDBVersionChangeEvent) => void
) {
	return function openStorage(name: string, version = 1) {
		return new Promise(function (resolve, reject) {
			if (!IDB_REF) {
				reject('indexedDb not supported !');
			}
			console.log('openstorage version', version);
			const request = IDB_REF.open(name, Number(version));

			request.onupgradeneeded = onUpgradeNeeded(resolve, reject);

			request.onsuccess = onSuccess(resolve, reject);

			request.onerror = function (e) {
				reject(e);
			};
		});
	};
}

export default createOpenDb;
