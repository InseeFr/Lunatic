import React, { useEffect, useState } from 'react';
import { createAppendTask } from '../../utils/suggester-workers/append-to-index';
import Progress from './progress';
import { clearStoreData } from '../../utils/store-tools';

function empty() {}

function Loader({ start, db, store, idbVersion, fetch, post, handleClick }) {
	const [progress, setProgress] = useState(0);
	const [entities, setEntities] = useState(undefined);

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

	function log({ message }) {
		const { type, percent } = message;
		if (type === 'bulk-insert/complete') {
			setProgress(percent);
		}
	}

	useEffect(
		function () {
			let abort;
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

Loader.defaultProps = { idbVersion: '1', post: empty, handleClick: empty };

export default Loader;
