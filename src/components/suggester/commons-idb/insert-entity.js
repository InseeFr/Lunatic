function insert(db, storeName, entity) {
	return new Promise(function (resolve, reject) {
		const transaction = db.transaction(storeName, 'readwrite');
		const store = transaction.objectStore(storeName);
		const request = store.add(entity);
		request.onsuccess = () => {
			resolve('success');
		};
		request.onerror = (e) => {
			reject(e);
		};
	});
}

export default insert;
