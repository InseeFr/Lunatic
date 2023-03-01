function insert<T>(
	db: IDBDatabase,
	storeName: string,
	entity: T
): Promise<boolean> {
	return new Promise(function (resolve, reject) {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.add(entity);
		request.onsuccess = () => {
			resolve(true);
		};
		request.onerror = (e) => {
			reject(false);
		};
	});
}

export default insert;
