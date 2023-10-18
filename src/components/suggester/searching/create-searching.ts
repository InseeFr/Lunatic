// @ts-ignore
import { createWorker } from '../../../utils/suggester-workers/create-worker';
import type { ComboBoxOptionType } from '../../commons/components/combo-box/combo-box.type';

const WORKER_PATH =
	// @ts-ignore
	import.meta.env.LUNATIC_SEARCH_WORKER_PATH ||
	// @ts-ignore
	import.meta.env.REACT_APP_LUNATIC_SEARCH_WORKER_PATH;

export function isWorkerCompatible(): boolean {
	return !!window.Worker;
}

const searching =
	(worker?: Worker) =>
	(
		search: string | null,
		name: string,
		version: string
	): Promise<{ results: ComboBoxOptionType[] }> => {
		if (!WORKER_PATH) {
			throw new Error("Worker path is required for suggester's searches.");
		}
		if (isWorkerCompatible()) {
			return new Promise(function (resolve) {
				try {
					if (worker) {
						worker.terminate();
					}
					worker = createWorker(WORKER_PATH);
					worker!.postMessage({ search, name, version });
					worker!.addEventListener('message', function (e) {
						const { data } = e;
						resolve(data);
						worker?.terminate();
						worker = undefined;
					});
				} catch (e) {
					//TODO
				}
			});
		}
		// TODO
		return Promise.reject('No worker found');
	};

function createSearching(name: string, version: string) {
	let worker = undefined;
	const searching_ = searching(worker);
	return async function (search: string | null) {
		return searching_(search, name, version);
	};
}

export default createSearching;
