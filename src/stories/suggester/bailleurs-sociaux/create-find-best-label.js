function createFindBestLabel() {
	let worker;
	return function find(option, search) {
		if (worker) {
			worker.terminate();
			worker = undefined;
		}
		worker = new Worker('/workers/lunatic-label-worker-0.1.2-experimental.js');
		return new Promise(function (resolve) {
			worker.addEventListener('message', function (e) {
				const { data } = e;
				resolve(data);
			});
			worker.postMessage({ option, search });
		});
	};
}

export default createFindBestLabel;
