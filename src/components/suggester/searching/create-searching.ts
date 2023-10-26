// @ts-ignore
import { createWorker } from '../../../utils/suggester-workers/create-worker-ts';
import {
	WorkerEnum,
	getWorkerPath,
} from '../../../utils/suggester-workers/worker-path';
import type { ComboBoxOptionType } from '../../commons/components/combo-box/combo-box.type';

export function isWorkerCompatible(): boolean {
	return !!window.Worker;
}

function getWorker(resolve: Function): Worker {
	const WORKER = createWorker(getWorkerPath(WorkerEnum.SEARCH));
	WORKER!.addEventListener('message', function (e) {
		const { data } = e;
		resolve(data);
		WORKER?.terminate();
	});

	return WORKER!;
}

function createSearching(name: string, version: string) {
	return async function (search: string | null) {
		return new Promise<{ results: ComboBoxOptionType[] }>(function (resolve) {
			const worker = getWorker(resolve);
			worker.postMessage({
				search,
				name,
				version,
			});
		});
	};
}
export default createSearching;
