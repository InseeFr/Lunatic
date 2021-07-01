import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Suggester } from './components';
import { searching } from './searching';
import CheckStore from './check-store';

function createSearching(storeName, version) {
	return async function (search, max) {
		return searching(search, storeName, version, max);
	};
}

function IDBSuggester({
	storeName,
	version,
	id,
	className,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	onChange,
	max,
}) {
	const [store, setStore] = useState(undefined);
	const cally = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, version);
			}
			return () => [];
		},
		[storeName, version, store]
	);

	return (
		<CheckStore storeName={storeName} version={version} setStore={setStore}>
			<Suggester
				id={id}
				className={className}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				onChange={onChange}
				searching={cally}
				max={max}
			/>
		</CheckStore>
	);
}

IDBSuggester.propTypes = {
	storeName: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	id: PropTypes.string,
	className: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
	max: PropTypes.number,
};

export default IDBSuggester;
