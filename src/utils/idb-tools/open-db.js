/* eslint-disable no-restricted-globals */
import getIDB from './get-idb';

const IDB_REF = getIDB();

function openStorage(name, version = 1) {
	return new Promise(function (resolve, reject) {
		if (!IDB_REF) {
			reject('indexedDb not supported !');
		}
		const request = IDB_REF.open(name, version);
		let db;
		let doIt = true;

		request.onupgradeneeded = function (e) {
			doIt = false;
			e.target.transaction.abort();
			reject('fail');
		};

		request.onsuccess = function () {
			db = request.result;
			if (doIt) resolve(db);
		};

		request.onerror = function (e) {
			reject(e);
		};
	});
}

export default openStorage;
