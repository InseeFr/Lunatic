import React, { useEffect, useState } from 'react';
import createAppendTask from './create-append-task';
import Progress from './progress';
import { clearStoreData } from '../../../utils/store-tools';

function postLoad() {}

function Loader({
	start,
	db,
	store,
	idbVersion = '1',
	fetch,
	post = postLoad,
}) {
	const [progress, setProgress] = useState(0);
	const [entities, setEntities] = useState(undefined);
	const { name, fields } = store;

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
			const [start, abort] = createAppendTask(name, idbVersion, fields, log);

			async function go() {
				try {
					if (entities && db) {
						clearStoreData(db);
						await start(entities);
						post(name);
					}
				} catch (e) {
					console.warn(e);
				}
			}

			go();

			return function () {
				abort();
			};
		},
		[name, fields, db, entities, idbVersion, post]
	);

	return (
		<span style={{ position: 'relative' }}>
			<span style={{ position: 'absolute', top: 0 }}>{name}</span>
			<Progress percent={progress} display={true} />
		</span>
	);
}

export default Loader;
