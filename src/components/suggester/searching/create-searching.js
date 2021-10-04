const WORKER_PATH =
	process.env.LUNATIC_SEARCH_WORKER_PATH ||
	process.env.REACT_APP_LUNATIC_SEARCH_WORKER_PATH;

export function isWorkerCompatible() {
	if (window.Worker) {
		return true;
	}
	return false;
}

const searching = (worker) => (search, name, version) => {
	if (!WORKER_PATH) {
		throw new Error("Worker path is required for suggester's searchs.");
	}
	if (isWorkerCompatible()) {
		return new Promise(function (resolve) {
			try {
				if (worker) {
					worker.terminate();
				}
				worker = new Worker(WORKER_PATH);
				worker.postMessage({ search, name, version });
				worker.addEventListener('message', function (e) {
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
};

function createSearching(name, version) {
	let WORKER = undefined;
	const searching_ = searching(WORKER);
	return async function (search) {
		return searching_(search, name, version);
	};
}

export default createSearching;
