import CONSTANTES from '../constantes';

function update(db, storeInfo) {
	return new Promise(function (resolve, reject) {
		try {
			const transaction = db.transaction(
				CONSTANTES.STORE_INFO_NAME,
				'readwrite'
			);
			const store = transaction.objectStore(CONSTANTES.STORE_INFO_NAME);
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

export default update;
