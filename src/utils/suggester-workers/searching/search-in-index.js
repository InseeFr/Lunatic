import { MAX_STRING } from '../../../constants/indexedDBStore';

function search(token, index) {
	const range = IDBKeyRange.bound(token, `${token}${MAX_STRING}`);
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
