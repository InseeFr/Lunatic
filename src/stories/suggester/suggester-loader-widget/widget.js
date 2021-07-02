import React, { useEffect, useState } from 'react';
import { useStoreIndex } from '../../../utils/store-tools';

function LoaderRow({ storeInfo, idbVersion }) {
	const { name } = storeInfo;
	// const db = useStoreIndex(storeInfo, idbVersion);
	return (
		<div>
			<span>{name}</span>
			<span>
				<button>Load!</button>
			</span>
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
						{ storeInfo, idbVersion },
					]) {
						// const db = openOrCreateStore(name, idbVersion);
						return (
							<LoaderRow
								key={name}
								storeInfo={storeInfo}
								idbVersion={idbVersion}
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
