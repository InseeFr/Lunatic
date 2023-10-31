import type { SuggesterType } from '../../../use-lunatic/type-source';
import { Logger } from '../../logger';
import { createWorker } from '../create-worker-ts';
import { WorkerEnum, getWorkerPath } from '../worker-path';

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
	log = consoleLogging,
	workersBasePath?: string
): [(args: Array<any>) => Promise<boolean>, () => void] {
	const { name, fields, stopWords, meloto } = info;
	const worker = createWorker(
		getWorkerPath(WorkerEnum.LOADER, workersBasePath)
	);
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
