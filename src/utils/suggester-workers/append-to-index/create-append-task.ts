import { SuggesterType } from '../../../use-lunatic/type-source';
import { createWorker } from '../create-worker-ts';
import { getWorkerPath } from '../../store-tools/worker-path';
import { Logger } from '../../logger';

function consoleLogging(...args: Array<any>) {
	args.forEach(function (any) {
		Logger.log(`suggester: ${JSON.stringify(any)}`);
	});
}

/**
 * Only with Worker
 */
export function createAppendTask<T>(
	info: SuggesterType,
	version: number,
	log = consoleLogging
): [(args: Array<any>) => Promise<boolean>, () => void] {
	const { name, fields, stopWords, meloto } = info;
	const worker = createWorker(getWorkerPath());
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
				worker.postMessage({
					name,
					version,
					fields,
					stopWords,
					entities,
					meloto,
				});
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
