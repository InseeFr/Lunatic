import React, { useEffect, useState, useCallback } from 'react';
import LoaderRow from './loader-row';
import { IsNetwork } from '../../utils/components/is-network';
import './widget.scss';

function SuggesterLoaderWidget({ source, getStoreInfo, onRefresh }) {
	const { suggesters } = source;
	const [stores, setStores] = useState(undefined);
	const [rows, setRows] = useState([]);
	const [disabled, setDisabled] = useState(false);

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

	const notify = useCallback(function (online) {
		setDisabled(!online);
	}, []);

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
								disabled={disabled}
							/>
						);
					})
				);
			}
		},
		[stores, disabled]
	);
	return (
		<div className="lunatic-suggester-widget">
			<IsNetwork className="suggester-widget-network" notify={notify} />
			{rows}
		</div>
	);
}

export default SuggesterLoaderWidget;
