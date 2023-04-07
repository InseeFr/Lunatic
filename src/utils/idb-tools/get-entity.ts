function get<T = unknown>(
	db: IDBDatabase,
	storeName: string,
	id: IDBValidKey | IDBKeyRange
) {
	return new Promise(function (resolve, reject) {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.get(id);
		transaction.onerror = function () {
			reject(transaction.error);
		};
		request.onsuccess = function () {
			resolve(request.result as T);
		};
	});
}

export default get;
