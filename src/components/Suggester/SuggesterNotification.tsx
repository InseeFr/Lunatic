import { type ReactNode } from 'react';
import { Notification } from '../shared/Notification';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { Label } from '../shared/Label/Label';

type Props = {
	status: 'Error' | 'Idle';
	storeName: string;
	label?: ReactNode;
	description?: ReactNode;
};

function LunaticSuggesterNotification({
	status,
	storeName,
	label,
	description,
}: Props) {
	if (status === 'Idle') {
		return (
			<>
				<Label description={description}>{label}</Label>
				<Notification
					className="info"
					title={`Chargement : ${storeName}`}
					description={`Votre référentiel est en cours de chargement. Vous pouvez poursuivre le questionnaire et revenir ultérieurement sur cette question.`}
				/>
			</>
		);
	}
	if (status === 'Error') {
		return (
			<>
				<Label description={description}>{label}</Label>
				<Notification
					className="error"
					title={`Échec chargement`}
					description={`Le référentiel ${storeName} n'a pas pu finir son chargement correctement.`}
				/>
			</>
		);
	}
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

export const SuggesterNotification = slottableComponent(
	'SuggesterNotification',
	LunaticSuggesterNotification
);
