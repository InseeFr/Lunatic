import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SuggesterWrapper from './suggester-wrapper';
import { searching } from './searching';
import CheckStore from './check-store';

function createSearching(storeName, version) {
	return async function (search, max) {
		return searching(search, storeName, version, max);
	};
}

function IDBSuggester({
	storeName,
	idbVersion,
	id,
	className,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	disabled,
	max,
}) {
	const [store, setStore] = useState(undefined);
	const search = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, idbVersion);
			}
			return () => [];
		},
		[storeName, idbVersion, store]
	);

	return (
		<CheckStore
			storeName={storeName}
			idbVersion={idbVersion}
			setStore={setStore}
		>
			<SuggesterWrapper
				id={id}
				className={className}
				labelledBy={labelledBy}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				searching={search}
				storeName={storeName}
				disabled={disabled}
				max={max}
			/>
		</CheckStore>
	);
}

IDBSuggester.defaultProps = {
	idbVersion: '1',
};

IDBSuggester.propTypes = {
	storeName: PropTypes.string.isRequired,
	idbVersion: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	labelledBy: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	max: PropTypes.number,
};

export default IDBSuggester;
