import React from 'react';
import CheckStore from './check-store';
import SuggesterNotification from './suggester-notification';

export const STATUS = {
	unused: 0,
	idle: 1,
	pending: 2,
	success: 3,
	unknown: 4,
	error: 5,
};

function SuggesterStatus({
	children,
	storeName,
	idbVersion,
	setStore,
	getSuggesterStatus,
}) {
	const { status } = getSuggesterStatus(storeName);

	return (
		<SuggesterNotification status={status} storeName={storeName}>
			<CheckStore
				storeName={storeName}
				idbVersion={idbVersion}
				setStore={setStore}
			>
				{children}
			</CheckStore>
		</SuggesterNotification>
	);
}

export default SuggesterStatus;
