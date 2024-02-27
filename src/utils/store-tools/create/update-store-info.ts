import IndexedDBStore from '../../../constants/indexedDBStore';

function updateStoreInfo(db: IDBDatabase, storeInfo: any) {
	return new Promise(function (resolve, reject) {
		try {
			const transaction = db.transaction(
				IndexedDBStore.STORE_INFO_NAME,
				'readwrite'
			);
			const store = transaction.objectStore(IndexedDBStore.STORE_INFO_NAME);
			const request = store.add(storeInfo);

			request.onsuccess = function () {
				resolve('success');
			};

			request.onerror = function (e) {
				reject(e);
			};
		} catch (e) {
			reject(e);
		}
	});
}

export default updateStoreInfo;
