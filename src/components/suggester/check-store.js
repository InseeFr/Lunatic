import React, { useEffect, useState } from 'react';
import { openDb, CONSTANTES, getEntity } from './commons-idb';

function CheckStore({ storeName, version, setStore, children }) {
	const [ready, setReady] = useState(0);

	useEffect(
		function () {
			async function init() {
				try {
					const db = await openDb(storeName, version);
					const info = await getEntity(
						db,
						CONSTANTES.STORE_INFO_NAME,
						storeName
					);

					if (db && info) {
						setReady(200);
						setStore(info);
					}
				} catch (e) {
					setReady(400);
				}
			}

			init();
		},
		[storeName, version, setStore]
	);
	if (ready === 0) {
		return (
			<div className="lunatic-suggester-in-progress">
				Le store {storeName} est en cour de chargement.
			</div>
		);
	}
	if (ready === 200) {
		return children;
	}
	return (
		<div className="lunatic-suggester-unvailable">
			Le store {storeName} n'est pas disponible.
		</div>
	);
}

export default CheckStore;
