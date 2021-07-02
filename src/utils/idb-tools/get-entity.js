function get(db, storeName, id) {
	return new Promise(function (resolve, reject) {
		const transaction = db.transaction(storeName, 'readwrite');
		var store = transaction.objectStore(storeName);
		const request = store.get(id);
		transaction.onerror = function () {
			reject(transaction.error);
		};
		request.onsuccess = function () {
			resolve(request.result);
		};
	});
}

export default get;
