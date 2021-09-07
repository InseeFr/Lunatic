import openStorage from './open-or-create-store';
import updateStoreInfo from './create/update-store-info';
import cleanStorage from './clear-store-data';
import cleanInfoStorage from './clear-store-info';

const workerPath =
	process.env.LUNATIC_LOADER_WORKER_PATH ||
	process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH ||
	'workers/lunatic-loader-worker-0.1.0.js';

const getUniqueId = (res) => {
	const map = {};
	return res.reduce((acc, r, i) => {
		if (r.id in map) return acc;
		map[r.id] = `i-${i}`;
		return [...acc, r];
	}, []);
};

export const loadSuggesters = (suggesterFetcher) => async (suggesters) => {
	Object.entries(suggesters).forEach(async ([name, attrs]) => {
		const { version } = attrs;
		const db = await openStorage(name, version);
		if (db) {
			await cleanStorage(db);
			await cleanInfoStorage(db);
			await updateStoreInfo(db, attrs);
		}
	});
	Object.entries(suggesters).forEach(([name, attrs]) => {
		const { url, version, fields } = attrs;
		const f = suggesterFetcher || fetch;
		f(url).then(async (res) => {
			const data = await res.json();
			const uniqueData = getUniqueId(data);
			const [launch] = task(name, version, fields);
			await launch(uniqueData);
		});
	});
};

/**
 * Only with Worker
 */
function task(name, version, fields, log = () => null) {
	const worker = new Worker(workerPath);
	let start = false;
	let stop = false;

	function launch(entities, post = () => null) {
		return new Promise(function (resolve) {
			start = true;
			worker.postMessage({ name, version, fields, entities });
			worker.addEventListener('message', function (e) {
				const { data } = e;
				if (data === 'success') {
					if (!stop) {
						post();
					}
					resolve(data);
				} else {
					log(data);
				}
			});
		});
	}

	function terminate() {
		if (start) {
			stop = true;
			worker.terminate();
		}
	}

	return [launch, terminate];
}
