import {
	useCallback,
	useEffect,
	useState,
	type PropsWithChildren,
} from 'react';
import { getEntity, openDb } from '../../../utils/idb-tools';
import { Logger } from '../../../utils/logger';
import { CONSTANTES } from '../../../utils/store-tools';

type Props = PropsWithChildren<{
	storeName: string;
	version: number;
	onInfo: (v: any) => void;
}>;

/**
 * Check the store info displaying a message while it is fetching
 */
function CheckStore({ storeName, version, onInfo, children }: Props) {
	const [ready, setReady] = useState(0);
	const [refresh, setRefresh] = useState(false);

	const checkStore = useCallback(
		async function () {
			try {
				const db = await openDb(storeName, version);
				const info = await getEntity(db, CONSTANTES.STORE_INFO_NAME, storeName);
				if (db && info) {
					setReady(200);
					onInfo(info);
				}
			} catch (e) {
				setReady(400);
			}
		},
		[storeName, version, onInfo]
	);

	useEffect(
		function () {
			checkStore();
		},
		[checkStore]
	);

	useEffect(
		function () {
			if (refresh) {
				setRefresh(false);
				async function go() {
					await checkStore();
				}

				go().catch(Logger.error);
			}
		},
		[refresh, checkStore]
	);

	if (ready === 0) {
		return (
			<div className="lunatic-suggester-in-progress">
				Le store {storeName} est en cours de chargement.
			</div>
		);
	}
	if (ready === 200) {
		return <>{children}</>;
	}
	return (
		<>
			<div className="lunatic-suggester-unvailable">
				La suggestion sur liste n'est pas possible sur votre navigateur, vous
				pouvez passer la question en appuyant sur Enregistrer et Continuer
			</div>
			{children}
		</>
	);
}

export default CheckStore;
