import { CONSTANTES } from '../../store-tools';

function search(token, index) {
	const range = IDBKeyRange.bound(token, `${token}${CONSTANTES.MAX_STRING}`);
	return new Promise(function (resolve, reject) {
		try {
			index.getAll(range).onsuccess = function (req) {
				const results = req.target.result;
				resolve(results);
			};
		} catch (e) {
			reject(e);
		}
	});
}

export default search;
