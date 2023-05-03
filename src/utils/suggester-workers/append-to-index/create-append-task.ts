import { SuggesterType } from '../../../use-lunatic/type-source';
import { createWorker } from '../create-worker-ts';

function consoleLogging(...args: Array<any>) {
	args.forEach(function (any) {
		console.log(`suggester: ${JSON.stringify(any)}`);
	});
}

function getWotkersPath() {
	return (
		process.env.LUNATIC_LOADER_WORKER_PATH ||
		process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH ||
		'workers/lunatic-loader-worker-0.1.0.js'
	);
}

/**
 * Only with Worker
 */
export function createAppendTask<T>(
	info: SuggesterType,
	version: number,
	log = consoleLogging
): [(args: Array<any>) => Promise<boolean>, () => void] {
	const { name, fields, stopWords } = info;
	const worker = createWorker(getWotkersPath());
	let start = false;
	let stop = false;

	function launch(entities: Array<T>, post = () => null): Promise<boolean> {
		return new Promise(function (resolve) {
			start = true;
			if (worker) {
				worker.addEventListener('message', function (e) {
					const { data } = e;
					if (data === 'success') {
						if (!stop) {
							post();
						}
						resolve(true);
					} else {
						log(data);
					}
				});
				worker.postMessage({ name, version, fields, stopWords, entities });
			}
		});
	}

	function terminate() {
		if (start) {
			stop = true;
			if (worker) {
				worker.terminate();
			}
		}
	}

	return [launch, terminate];
}
