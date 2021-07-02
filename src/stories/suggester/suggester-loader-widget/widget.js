import React, { useEffect, useState } from 'react';
import { openOrCreateStore } from '../../../utils/store-tools';

function SuggesterLoaderWidget({ source, getStoreInfo }) {
	const { suggesters } = source;
	const [disabled, setDisabled] = useState(true);
	const [stores, setStores] = useState(undefined);
	console.log(stores);
	useEffect(
		function () {
			if (Array.isArray(suggesters)) {
				const str = suggesters.reduce(function (a, name) {
					const storeInfo = getStoreInfo(name);
					return { ...a, [name]: storeInfo };
				}, {});
				setStores(str);
				setDisabled(false);
			}
		},
		[suggesters, getStoreInfo]
	);

	useEffect(
		function () {
			if (stores) {
				Object.entries(stores).map(function ([
					name,
					{ storeInfo, idbVersion },
				]) {
					const db = openOrCreateStore(name, idbVersion);
					return undefined;
				});
			}
		},
		[stores]
	);

	return (
		<div>
			<button>Load</button>
		</div>
	);
}

export default SuggesterLoaderWidget;
