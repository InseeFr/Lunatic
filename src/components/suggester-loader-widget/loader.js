import React, { useEffect, useState } from 'react';
import createAppendTask from './create-append-task';
import Progress from './progress';
import { clearStoreData } from '../../utils/store-tools';

function empty() {}

function Loader({
	start,
	db,
	store,
	idbVersion = '1',
	fetch,
	post = empty,
	handleClick = empty,
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
			let abort;
			async function go() {
				try {
					if (entities && db && idbVersion && fields) {
						const [start, abort_] = createAppendTask(
							name,
							idbVersion,
							fields,
							log
						);
						abort = abort_;
						clearStoreData(db);
						await start(entities);
						post(name, entities.length);
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
		[name, fields, db, entities, idbVersion, post]
	);

	return (
		<Progress percent={progress} display={true} handleClick={handleClick} />
	);
}

export default Loader;
