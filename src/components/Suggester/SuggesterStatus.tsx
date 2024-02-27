import { type PropsWithChildren, type ReactNode } from 'react';
import { SuggesterStatus as SuggesterStatusEnum } from '../../use-lunatic/use-suggesters';
import { Label } from '../shared/Label/Label';
import { SuggesterNotification } from './SuggesterNotification';

export const STATUS = {
	unused: 0,
	idle: 1,
	pending: 2,
	success: 3,
	unknown: 4,
	error: 5,
};

type Props = PropsWithChildren<{
	getSuggesterStatus: (s: string) => { status: SuggesterStatusEnum };
	storeName: string;
	label?: ReactNode;
	description?: ReactNode;
}>;

/**
 * Check the status of suggester status and shows a warning / error
 */
export function SuggesterStatus({
	children,
	storeName,
	getSuggesterStatus,
	label,
	description,
}: Props) {
	const { status } = getSuggesterStatus(storeName);

	if (status === SuggesterStatusEnum.unused) {
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
