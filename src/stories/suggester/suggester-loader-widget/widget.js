import React, { useEffect, useState, useCallback } from 'react';
import { useStoreIndex, getStoreCount } from '../../../utils/store-tools';
import Loader from './loader';
import './widget.scss';

function LoaderRow({ storeInfo, idbVersion, fetchStore }) {
	const { name } = storeInfo;
	const db = useStoreIndex(storeInfo, idbVersion);
	const [nbEntities, setNbEntities] = useState(undefined);
	const [start, setStart] = useState(false);
	const [disabled, setDisabled] = useState(true);

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
		<div className="widget">
			<div className="store-name">{name}</div>
			{start ? (
				<Loader
					start={true}
					db={db}
					store={storeInfo}
					idVersion={idbVersion}
					fetch={fetchStore}
					post={function (_, count) {
						// setStart(false);
						setNbEntities(count);
					}}
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
					>
						Load!
					</button>
				</>
			)}
		</div>
	);
}

function SuggesterLoaderWidget({ source, getStoreInfo }) {
	const { suggesters } = source;

	const [stores, setStores] = useState(undefined);
	const [rows, setRows] = useState([]);

	useEffect(
		function () {
			if (Array.isArray(suggesters)) {
				const str = suggesters.reduce(function (a, name) {
					const storeInfo = getStoreInfo(name);
					return { ...a, [name]: storeInfo };
				}, {});
				setStores(str);
			}
		},
		[suggesters, getStoreInfo]
	);

	useEffect(
		function () {
			if (stores) {
				setRows(
					Object.entries(stores).map(function ([
						name,
						{ storeInfo, idbVersion, fetch: fetchStore },
					]) {
						return (
							<LoaderRow
								key={name}
								storeInfo={storeInfo}
								idbVersion={idbVersion}
								fetchStore={fetchStore}
							/>
						);
					})
				);
			}
		},
		[stores]
	);

	return <div>{rows}</div>;
}

export default SuggesterLoaderWidget;
