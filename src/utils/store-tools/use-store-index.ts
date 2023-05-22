import { useEffect, useState } from 'react';
import createStore from './create';

function useStoreIndex(storeInfo: { name: string }, idbVersion?: number) {
	const [db, setDb] = useState<IDBDatabase>();

	useEffect(
		function () {
			async function init() {
				if (storeInfo && idbVersion) {
					const db = await createStore(storeInfo, idbVersion);
					setDb(db);
				}
			}

			init();
			return function () {};
		},
		[storeInfo, idbVersion]
	);
	return db;
}

export default useStoreIndex;
