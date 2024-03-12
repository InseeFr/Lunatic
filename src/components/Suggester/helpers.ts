// @ts-ignore
import { createWorker } from '../../utils/suggester-workers/create-worker';
import {
	WorkerEnum,
	getWorkerPath,
} from '../../utils/suggester-workers/worker-path';
import type { SuggesterOptionType } from './SuggesterType';

export function isWorkerCompatible(): boolean {
	return !!window.Worker;
}

function getWorker(resolve: Function, workersBasePath?: string): Worker {
	const WORKER = createWorker(
		getWorkerPath(WorkerEnum.SEARCH, workersBasePath)
	);
	WORKER!.addEventListener('message', function (e) {
		const { data } = e;
		resolve(data);
		WORKER?.terminate();
	});

	return WORKER!;
}

export function createSearching(
	name: string,
	version: string,
	workersBasePath?: string
) {
	return async function (search: string | null) {
		return new Promise<{ results: SuggesterOptionType[]; search: string }>(
			function (resolve) {
				const worker = getWorker(resolve, workersBasePath);
				worker.postMessage({
					search,
					name,
					version,
				});
			}
		);
	};
}
