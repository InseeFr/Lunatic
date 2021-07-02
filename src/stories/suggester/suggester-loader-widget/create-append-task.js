/**
 * Only with Worker
 */
function task(name, version, fields, log = () => null) {
	const worker = new Worker('workers/lunatic-append-worker-0.1.0.js'); // TODO
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

export default task;
