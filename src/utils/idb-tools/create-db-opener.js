import getIDB from './get-idb';

const IDB_REF = getIDB();

function onSuccessDefault(e, resolve) {
	resolve(e.result);
}

function onUpgradeNeededDefault() {
	throw new Error('Upgrade needed hook required!');
}

function onErrorDefault(e, _, reject) {
	reject(e.error);
}

function createDbOpener({
	onSuccess = onSuccessDefault,
	onUpgradeNeeded = onUpgradeNeededDefault,
	onError = onErrorDefault,
} = {}) {
	return function (name, version = 1) {
		return new Promise((resolve, reject) => {
			if (!IDB_REF) {
				reject('indexedDb not supported !');
			}
			const request = IDB_REF.open(name, version);
			request.onupgradeneeded = function (e) {
				onUpgradeNeeded(e, resolve, reject);
			};

			request.onsuccess = function (e) {
				onSuccess(e, resolve, reject);
			};

			request.onerror = function (e) {
				onError(e, resolve, reject);
			};
		});
	};
}

export default createDbOpener;
