async function clearStore(db: IDBDatabase, name: string): Promise<boolean> {
	return new Promise(function (resolve, reject) {
		try {
			console.log('clearStore');
			const transaction = db.transaction(name, 'readwrite');
			transaction.oncomplete = function () {
				resolve(true);
			};
			const store = transaction.objectStore(name);
			store.clear();
		} catch (e) {
			console.error(`Error when launch transaction on ${name}`, e);
			reject(false);
		}
	});
}

export default clearStore;
