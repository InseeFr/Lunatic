import React, { useEffect, useState } from 'react';
import LoaderRow from './loader-row';
import './widget.scss';

function SuggesterLoaderWidget({ source, getStoreInfo, onRefresh }) {
	const { suggesters } = source;
	const [stores, setStores] = useState(undefined);
	const [rows, setRows] = useState([]);

	useEffect(
		function () {
			if (suggesters) {
				const str = Object.entries(suggesters).reduce(function (
					a,
					[name, storeInfo]
				) {
					return { ...a, [name]: { storeInfo, ...getStoreInfo(name) } };
				},
				{});

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
								onRefresh={onRefresh}
							/>
						);
					})
				);
			}
		},
		[stores]
	);
	return <div className="lunatic-suggester-widget">{rows}</div>;
}

export default SuggesterLoaderWidget;
