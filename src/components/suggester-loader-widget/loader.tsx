import React, { useEffect, useState } from 'react';
import { createAppendTask } from '../../utils/suggester-workers/append-to-index';
import Progress from './progress';
import { clearStoreData } from '../../utils/store-tools';
import { voidFunction } from '../../utils/function';
import { SuggesterType } from '../../use-lunatic/type-source';

type Props = {
	idbVersion?: number;
	db?: IDBDatabase;
	post?: (name: string, length: number) => void;
	fetch: () => Promise<unknown[]>;
	handleClick: (n: number) => void;
	start?: boolean;
	store: Pick<SuggesterType, 'name' | 'fields' | 'stopWords'>;
};

function Loader({
	start,
	db,
	store,
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
						const [startT, abort_] = createAppendTask(store, idbVersion, log);
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
		[store, db, entities, idbVersion, post]
	);

	return (
		<Progress percent={progress} display={true} handleClick={handleClick} />
	);
}

export default Loader;
