import { useEffect, useState } from 'react';
import type { SuggesterType } from '../../use-lunatic/type-source';
import { voidFunction } from '../../utils/function';
import { clearStoreData } from '../../utils/store-tools';
import { createAppendTask } from '../../utils/suggester-workers/append-to-index';
import Progress from './progress';

type Props = {
	idbVersion?: number;
	db?: IDBDatabase;
	post?: (name: string, length: number) => void;
	fetch: () => Promise<unknown[]>;
	handleClick: (n: number) => void;
	start?: boolean;
	store: SuggesterType;
	workersBasePath?: string;
};

function Loader({
	start,
	db,
	store,
	workersBasePath,
	idbVersion = 1,
	fetch,
	post = voidFunction,
	handleClick = voidFunction,
}: Props) {
	const [progress, setProgress] = useState(0);
	const [entities, setEntities] = useState<unknown[]>();

	useEffect(
		function () {
			async function load() {
				if (typeof fetch === 'function' && start) {
					const e = await fetch();
					setEntities(e);
				}
			}
			load();
		},
		[fetch, start]
	);

	function log({ message }: { message: { type: string; percent: number } }) {
		const { type, percent } = message;
		if (type === 'bulk-insert/complete') {
			setProgress(percent);
		}
	}

	useEffect(
		function () {
			let abort: any;
			async function go() {
				try {
					if (entities && db && idbVersion && store) {
						const [startT, abort_] = createAppendTask(
							store,
							idbVersion,
							log,
							workersBasePath
						);
						abort = abort_;
						clearStoreData(db);
						await startT(entities);
						post(store.name, entities.length);
					}
				} catch (e) {
					console.warn(e);
				}
			}

			go();

			return function () {
				if (abort) {
					abort();
				}
			};
		},
		[store, db, entities, idbVersion, post, workersBasePath]
	);

	return (
		<Progress percent={progress} display={true} handleClick={handleClick} />
	);
}

export default Loader;
