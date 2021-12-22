import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SuggesterWrapper from './suggester-wrapper';
import createSearching from './searching';
import CheckStore from './check-store';

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
	value,
	focused,
	response,
	logFunction,
}) {
	const [store, setStore] = useState(undefined);
	const searching = useMemo(
		function () {
			if (store) {
				return createSearching(storeName, idbVersion);
			}
			return undefined;
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
				searching={searching}
				storeName={storeName}
				disabled={disabled}
				value={value}
				focused={focused}
				response={response}
				logFunction={logFunction}
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
};

export default IDBSuggester;
