import SearchingWorker from './searching.worker';
import searching from './searching';

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function withoutWorker(searh, storeName, version) {
	async function launch(entities) {
		return Promise.resolve(searching(searh, storeName, version));
	}

	function terminate() {}

	return [launch, terminate];
}

function withWorker(search, name, version) {
	const worker = new SearchingWorker();
	let start = false;
	let stop = false;

	function launch(search, name, version) {
		return new Promise(function (resolve) {
			start = true;
			worker.postMessage({ search, name, version });
			worker.addEventListener('message', function (e) {
				if (!stop) {
					const { data } = e;
					resolve(data);
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

function task(search, name, version) {
	if (isWorkerCompatible()) {
		return withWorker(search, name, version);
	} else {
		return withoutWorker(search, name, version);
	}
}

export default task;
