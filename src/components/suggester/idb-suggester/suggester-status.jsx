import React from 'react';
import Label from '../../commons/components/label';
import SuggesterNotification from './suggester-notification';

export const STATUS = {
	unused: 0,
	idle: 1,
	pending: 2,
	success: 3,
	unknown: 4,
	error: 5,
};

/**
 * Component witch check status of loading process.
 * it notifies users through SuggesterNotification, a customizable component.
 * @param {} param0
 * @returns
 */
export function SuggesterStatus({
	children,
	storeName,
	getSuggesterStatus,
	label,
	description,
}) {
	const { status } = getSuggesterStatus(storeName);

	if (status === SuggesterStatus.unused) {
		return (
			<>
				<Label description={description}>{label}</Label>
				{children}
			</>
		);
	}
	return (
		<SuggesterNotification
			status={status}
			storeName={storeName}
			label={label}
			description={description}
		>
			{children}
		</SuggesterNotification>
	);
}
