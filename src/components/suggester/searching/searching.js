const WORKER_PATH =
	process.env.LUNATIC_SEARCH_WORKER_PATH ||
	process.env.REACT_LUNATIC_SEARCH_WORKER_PATH;

let WORKER = undefined;

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

function create(search, name, version, max) {
	if (!WORKER_PATH) {
		throw new Error("Worker path is required for suggester's searchs.");
	}
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			try {
				if (WORKER) {
					WORKER.terminate();
				}
				WORKER = new Worker(WORKER_PATH);
				WORKER.postMessage({ search, name, version, max });
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
