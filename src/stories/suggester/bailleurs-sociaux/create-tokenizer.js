function createTokenizer() {
	let worker;
	return function tokenize(input = {}) {
		if (worker) {
			worker.terminate();
			worker = undefined;
		}
		worker = new Worker(
			'/workers/lunatic-tokenize-worker-0.1.2-experimental.js'
		);
		return new Promise(function (resolve) {
			worker.addEventListener('message', function (e) {
				const { data } = e;
				resolve(data);
			});
			worker.postMessage(input);
		});
	};
}

export default createTokenizer;
