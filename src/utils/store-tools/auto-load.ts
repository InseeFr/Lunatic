import openStorage from './open-or-create-store';
import updateStoreInfo from './create/update-store-info';
import cleanStorage from './clear-store-data';
import cleanInfoStorage from './clear-store-info';
// @ts-ignore
import { createWorker } from '../suggester-workers/create-worker';
import { getWorkerPath } from './worker-path';

type Task = {
	name: string;
	fields: string[];
	stopWords: string[];
};

export const loadSuggesters =
	(suggesterFetcher: typeof fetch) =>
	async (
		suggesters: Record<
			string,
			{ version: number; url: string; fields: string[]; stopWords: string[] }
		>
	) => {
		Object.entries(suggesters).map(async ([name, attrs]) => {
			const { version } = attrs;
			const db = await openStorage(name, version);
			if (db) {
				await cleanStorage(db);
				await cleanInfoStorage(db);
				await updateStoreInfo(db, attrs);
			}
		});
		Object.entries(suggesters).forEach(([name, attrs]) => {
			const { url, version, fields, stopWords } = attrs;
			const f = suggesterFetcher || fetch;
			f(url).then(async (res) => {
				const data = await res.json();
				const [launch, terminate] = task({ name, fields, stopWords }, version);
				await launch(data);
				terminate();
			});
		});
	};

/**
 * Only with Worker
 */
function task(
	{ name, fields, stopWords }: Task,
	version: number,
	log: (v: any) => void = () => null
) {
	const worker = createWorker(getWorkerPath());
	let start = false;
	let stop = false;

	function launch(entities: any, post = () => null) {
		return new Promise(function (resolve) {
			start = true;
			worker.postMessage({
				name,
				version,
				fields,
				entities,
				stopWords,
			});
			worker.addEventListener('message', function (e: any) {
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

	return [launch, terminate] as const;
}
