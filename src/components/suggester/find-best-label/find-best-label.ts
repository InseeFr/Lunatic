// @ts-ignore
import { createWorker } from '../../../utils/suggester-workers/create-worker';

const WORKER_PATH: string =
	process.env.LUNATIC_LABEL_WORKER_PATH ||
	process.env.REACT_APP_LUNATIC_LABEL_WORKER_PATH ||
	'';

let WORKER: Worker | null;
const TASKS = new Map<string, (v: unknown) => void>();

function getIdTask(): string {
	const id = `${Date.now()}`;
	if (id in TASKS) {
		return getIdTask();
	}
	return id;
}

function getWorker(): Worker {
	if (!WORKER) {
		WORKER = createWorker(WORKER_PATH);
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

function findBestLabel(option: unknown, search: unknown) {
	return new Promise(function (resolve) {
		const idTask = getIdTask();
		const worker = getWorker();

		TASKS.set(idTask, function (response) {
			resolve(response);
			TASKS.delete(idTask);
		});
		worker.postMessage({ option, search, idTask });
	});
}

export default findBestLabel;
