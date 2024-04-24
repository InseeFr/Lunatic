import { useEffect, useRef } from 'react';
import { LunaticComponents } from '../LunaticComponents';
import type { LunaticComponentProps } from '../type';

/**
 * Pour lem moment on fait semblant !!!
 */
function fetchFromServer(
	remote: string,
	values: unknown
): Promise<Record<string, unknown>> {
	/* ici on ne devra faire que du fetch sur remote, un post par ex */

	return new Promise((r) => {
		setTimeout(() => {
			r({ NOM: 'XXXX' });
		}, 1000);
	});
}

/**
 * Ce composant est en fait, une liste de sous composant.
 * Avant de présenter cette liste à l'utilisateur, il intérroge un service distant à l'adresse remote.
 * Il lui transmet les values de ses props (correspondants à responses dans source.json)
 * Il ré-intégre dans les variables lunatic les valeurs transmises pas le service distant.
 * Toutes ces données, en entrées comme en sorti, doivent-être strictement publique/non confidentielle.
 * @param props
 * @returns
 */
export function RemoteComponent(
	props: LunaticComponentProps<'RemoteComponent'>
) {
	const { remote, value, handleChange, getComponents } = props;

	const load = useRef(false);
	const fetched = useRef(false);

	useEffect(() => {
		if (remote && !load.current && !fetched.current) {
			load.current = true;
			fetchFromServer(remote, value).then(
				(response: Record<string, unknown>) => {
					fetched.current = true;
					if (response) {
						Object.entries(response).forEach(([name, value]) => {
							handleChange({ name }, value as string);
						});
					}
				}
			);
		}
	}, [handleChange, remote, value]);

	if (fetched.current) {
		return (
			<LunaticComponents
				components={getComponents()}
				componentProps={(c) => ({
					...c,
					id: `${c.id}`,
				})}
			/>
		);
	}

	return <div>waiting</div>;
}
