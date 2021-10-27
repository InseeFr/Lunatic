import openStorage from './open-or-create-store';
import updateStoreInfo from './create/update-store-info';
import cleanStorage from './clear-store-data';
import cleanInfoStorage from './clear-store-info';

const workerPath =
	process.env.LUNATIC_LOADER_WORKER_PATH ||
	process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH ||
	'workers/lunatic-loader-worker-0.1.0.js';

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
		const { url, version, fields, stopWords } = attrs;
		const f = suggesterFetcher || fetch;
		f(url).then(async (res) => {
			const data = await res.json();
			const [launch, terminate] = task({ name, fields, stopWords }, version);
			await launch(data);
			terminate();
		});
	});
};

/**
 * Only with Worker
 */
function task({ name, fields, stopWords }, version, log = () => null) {
	const worker = new Worker(workerPath);
	let start = false;
	let stop = false;

	function launch(entities, post = () => null) {
		return new Promise(function (resolve) {
			start = true;
			worker.postMessage({
				name,
				version,
				fields,
				entities,
				stopWords,
			});
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
