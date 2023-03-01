import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import { STATUS } from './suggester-status';
import Notification from './html/notification';

function SuggesterNotification({ children, status, storeName }) {
	if (status === STATUS.idle || status === STATUS.pending) {
		return (
			<Notification
				className="info"
				title={`Chargement : ${storeName}`}
				description={`Votre référentiel est en court de chargement. Vous pouvez poursuivre le questionnaire et revenir ultèrieurement sur cette question.`}
			/>
		);
	}
	if (status === STATUS.error) {
		return (
			<Notification
				className="error"
				title={`Echec chargement`}
				description={`Le référentiel ${storeName} n'a pas pu finir son chargement correctement.`}
			/>
		);
	}
	if (status === STATUS.unknown) {
		return (
			<Notification
				className="warn"
				title={`Référentiel inconnu`}
				description={`Le référentiel ${storeName} n'est pas pris en compte par l'application.`}
			/>
		);
	}

	return <>{children}</>;
}

export default createCustomizableLunaticField(
	SuggesterNotification,
	'SuggesterNotification'
);
