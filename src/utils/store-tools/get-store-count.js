import CONSTANTES from './constantes';

function get(db) {
	return new Promise(function (resolve, reject) {
		try {
			const transaction = db.transaction(
				[CONSTANTES.STORE_DATA_NAME],
				'readonly'
			);

			const store = transaction.objectStore(CONSTANTES.STORE_DATA_NAME);
			const countRequest = store.count();
			countRequest.onsuccess = function () {
				resolve(countRequest.result);
			};
		} catch (e) {
			reject(e);
		}
	});
}

export default get;
