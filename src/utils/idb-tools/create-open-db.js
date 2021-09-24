/* eslint-disable no-restricted-globals */
import getIDB from './get-idb';

const IDB_REF = getIDB();

function create(onSuccess, onUpgradeNeeded) {
	return function openStorage(name, version = 1) {
		return new Promise(function (resolve, reject) {
			if (!IDB_REF) {
				reject('indexedDb not supported !');
			}
			const request = IDB_REF.open(name, version);

			request.onupgradeneeded = onUpgradeNeeded(resolve, reject);

			request.onsuccess = onSuccess(resolve, reject);

			request.onerror = function (e) {
				reject(e);
			};
		});
	};
}

export default create;
