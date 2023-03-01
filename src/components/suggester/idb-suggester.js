import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Suggester from './html/suggester';
import createSearching from './searching';
import CheckStore from './check-store';
import SuggesterStatus from './suggester-status';

function IDBSuggester({
	storeName,
	idbVersion,
	id,
	className,
	optionRenderer,
	labelRenderer,
	onSelect,
	disabled,
	value,
	label,
	description,
	getSuggesterStatus,
	errors,
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
		<SuggesterStatus
			storeName={storeName}
			idbVersion={idbVersion}
			setStore={setStore}
			getSuggesterStatus={getSuggesterStatus}
		>
			<Suggester
				id={id}
				className={className}
				optionRenderer={optionRenderer}
				labelRenderer={labelRenderer}
				onSelect={onSelect}
				searching={searching}
				disabled={disabled}
				value={value}
				label={label}
				description={description}
				errors={errors}
			/>
		</SuggesterStatus>
	);
}

IDBSuggester.defaultProps = {
	idbVersion: '1',
	label: undefined,
	description: undefined,
	errors: undefined,
};

IDBSuggester.propTypes = {
	storeName: PropTypes.string.isRequired,
	idbVersion: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	optionRenderer: PropTypes.func,
	labelRenderer: PropTypes.func,
	onSelect: PropTypes.func,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.array,
	]),
	errors: PropTypes.object,
};

export default IDBSuggester;
