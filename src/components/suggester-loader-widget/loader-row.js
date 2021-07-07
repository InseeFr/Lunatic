import React, { useEffect, useState, useCallback } from 'react';
import { useStoreIndex, getStoreCount } from '../../utils/store-tools';
import Loader from './loader';

function LoaderRow({ storeInfo, idbVersion, fetchStore }) {
	const { name } = storeInfo;
	const db = useStoreIndex(storeInfo, idbVersion);
	const [nbEntities, setNbEntities] = useState(undefined);
	const [start, setStart] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const post = useCallback(function (_, count) {
		setNbEntities(count);
	}, []);

	useEffect(
		function () {
			async function count() {
				const c = await getStoreCount(db);
				setNbEntities(c);
				setDisabled(false);
			}

			if (db) {
				count();
			}
		},
		[db]
	);

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
				/>
			) : (
				<>
					<div className="stats">
						{nbEntities > 0 ? `${nbEntities} entities.` : 'Empty store.'}
					</div>

					<button
						className="load"
						disabled={disabled}
						onClick={() => setStart(true)}
						title="load"
					>
						l
					</button>
					<button
						className="clear"
						disabled={disabled}
						onClick={() => null}
						title="clear todo"
					>
						x
					</button>
				</>
			)}
		</div>
	);
}

export default LoaderRow;
