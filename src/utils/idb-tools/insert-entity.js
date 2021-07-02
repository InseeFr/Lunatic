function insert(db, storeName, entity) {
	return new Promise(function (resolve, reject) {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.add(entity);
		request.onsuccess = function () {
			resolve('success');
		};
		request.onerror = function (e) {
			reject(e);
		};
	});
}

export default insert;
