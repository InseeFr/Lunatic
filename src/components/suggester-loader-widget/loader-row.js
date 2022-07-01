import React, { useEffect, useState, useCallback } from 'react';
import classnames from 'classnames';
import {
	useStoreIndex,
	getStoreCount,
	clearStoreData,
} from '../../utils/store-tools';
import { CrossIcon, LoadIcon } from '../commons/icons';
import Loader from './loader';

function LoaderRow({
	storeInfo,
	idbVersion,
	fetchStore,
	onRefresh,
	disabled = false,
}) {
	const { name } = storeInfo;
	const db = useStoreIndex(storeInfo, idbVersion);
	const [nbEntities, setNbEntities] = useState(undefined);
	const [start, setStart] = useState(false);

	const post = useCallback(
		function (_, count) {
			setNbEntities(count);
			onRefresh(`Store ${name} loaded.`);
		},
		[onRefresh, name]
	);
	const clear = useCallback(
		function () {
			if (db) {
				clearStoreData(db);
				setNbEntities(0);
			}
		},
		[db]
	);

	useEffect(
		function () {
			async function count() {
				const c = await getStoreCount(db);
				setNbEntities(c);
			}

			if (db) {
				count();
			}
		},
		[db]
	);

	const handleClick = useCallback(function (p) {
		if (p === 100) {
			setStart(false);
		}
	}, []);

	return (
		<div className="widget-row">
			<div className="store-name">{name}</div>
			{start ? (
				<Loader
					start={true}
					db={db}
					store={storeInfo}
					idVersion={idbVersion}
					fetch={fetchStore}
					post={post}
					handleClick={handleClick}
				/>
			) : (
				<>
					<div className="stats">
						{nbEntities > 0 ? `${nbEntities} entities.` : 'Empty store.'}
					</div>

					<button
						className={classnames('widget-button', { disabled })}
						disabled={disabled}
						onClick={() => setStart(true)}
						title="Load"
					>
						<LoadIcon className="lunatic-suggester-icon" />
					</button>
					<button
						className={classnames('widget-button', { disabled })}
						disabled={disabled}
						onClick={clear}
						title="Clear"
					>
						<CrossIcon className="lunatic-suggester-icon" />
					</button>
				</>
			)}
		</div>
	);
}

export default LoaderRow;
