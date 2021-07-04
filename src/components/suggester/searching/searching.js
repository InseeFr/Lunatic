const workerPath =
	process.env.LUNATIC_SEARCH_WORKER_PATH ||
	process.env.REACT_LUNATIC_SEARCH_WORKER_PATH ||
	'workers/lunatic-search-worker.js';
let WORKER = undefined;

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(searh, name, version, max) {
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			try {
				if (WORKER) {
					WORKER.terminate();
				}
				WORKER = new Worker(workerPath); // TODO give worker path in client app
				WORKER.postMessage({ searh, name, version, max });
				WORKER.addEventListener('message', function (e) {
					const { data } = e;
					resolve(data);
				});
			} catch (e) {
				//TODO
			}
		});
	} else {
		// TODO
	}
}

export default create;
