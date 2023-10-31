// @ts-ignore
import { createWorker } from '../../../utils/suggester-workers/create-worker-ts';
import {
	WorkerEnum,
	getWorkerPath,
} from '../../../utils/suggester-workers/worker-path';

let WORKER: Worker | null;
const TASKS = new Map<string, (v: unknown) => void>();

function getIdTask(): string {
	const id = `${Date.now()}`;
	if (id in TASKS) {
		return getIdTask();
	}
	return id;
}

function getWorker(workersBasePath?: string): Worker {
	if (!WORKER) {
		WORKER = createWorker(getWorkerPath(WorkerEnum.LABEL, workersBasePath));
		WORKER!.addEventListener('message', function (e) {
			const { data } = e;
			const { response, idTask } = data;
			if (TASKS.has(idTask)) {
				TASKS.get(idTask)!(response);
			}
		});
	}
	return WORKER!;
}

function findBestLabel(
	option: unknown,
	search: unknown,
	workersBasePath?: string
) {
	return new Promise(function (resolve) {
		const idTask = getIdTask();
		const worker = getWorker(workersBasePath);

		TASKS.set(idTask, function (response) {
			resolve(response);
			TASKS.delete(idTask);
		});
		worker.postMessage({ option, search, idTask });
	});
}

export default findBestLabel;
