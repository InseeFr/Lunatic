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
				WORKER = new Worker('workers/lunatic-searching-worker-0.1.0.js'); // TODO give worker path in client app
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
