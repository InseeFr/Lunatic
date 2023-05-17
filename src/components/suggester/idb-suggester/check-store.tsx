import React, {
	useEffect,
	useState,
	useCallback,
	PropsWithChildren,
} from 'react';
import { openDb, getEntity } from '../../../utils/idb-tools';
import { CONSTANTES } from '../../../utils/store-tools';

type Props = PropsWithChildren<{
	storeName: string;
	version: number;
	setStore: (v: any) => void;
}>;

function CheckStore({ storeName, version, setStore, children }: Props) {
	const [ready, setReady] = useState(0);
	const [refresh, setRefresh] = useState(false);

	const checkStore = useCallback(
		async function () {
			try {
				const db = await openDb(storeName, version);
				const info = await getEntity(db, CONSTANTES.STORE_INFO_NAME, storeName);

				if (db && info) {
					setReady(200);
					setStore(info);
				}
			} catch (e) {
				setReady(400);
			}
		},
		[storeName, version, setStore]
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

				go();
			}
		},
		[refresh, checkStore]
	);

	if (ready === 0) {
		return (
			<div className="lunatic-suggester-in-progress">
				Le store {storeName} est en cour de chargement.
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
