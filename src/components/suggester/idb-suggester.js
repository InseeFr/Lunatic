import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Suggester from './html/suggester';
import createSearching from './searching';
import CheckStore from './check-store';

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
		<CheckStore
			storeName={storeName}
			idbVersion={idbVersion}
			setStore={setStore}
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
		</CheckStore>
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
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
};

export default IDBSuggester;
