import React, { type PropsWithChildren, type ReactNode } from 'react';
import { createCustomizableLunaticField } from '../../commons';
import { STATUS } from './suggester-status';
import Label from '../../commons/components/label';
import Notification from '../html/notification';
import { SuggesterStatus } from '../../../use-lunatic/use-suggesters';

type Props = PropsWithChildren<{
	status: SuggesterStatus;
	storeName: string;
	label?: ReactNode;
	description?: ReactNode;
}>;

function SuggesterNotification({
	children,
	status,
	storeName,
	label,
	description,
}: Props) {
	if (status === STATUS.idle || status === STATUS.pending) {
		return (
			<>
				<Label description={description}>{label}</Label>
				<Notification
					className="info"
					title={`Chargement : ${storeName}`}
					description={`Votre référentiel est en court de chargement. Vous pouvez poursuivre le questionnaire et revenir ultèrieurement sur cette question.`}
				/>
			</>
		);
	}
	if (status === STATUS.error) {
		return (
			<>
				<Label description={description}>{label}</Label>
				<Notification
					className="error"
					title={`Echec chargement`}
					description={`Le référentiel ${storeName} n'a pas pu finir son chargement correctement.`}
				/>
			</>
		);
	}
	if (status === STATUS.unknown) {
		return (
			<>
				<Label description={description}>{label}</Label>
				<Notification
					className="warn"
					title={`Référentiel inconnu`}
					description={`Le référentiel ${storeName} n'est pas pris en compte par l'application.`}
				/>
			</>
		);
	}

	return <>{children}</>;
}

export default createCustomizableLunaticField(
	SuggesterNotification,
	'SuggesterNotification'
);
