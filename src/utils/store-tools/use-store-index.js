import { useEffect, useState } from 'react';
import createStore from './create';

function useStoreIndex(storeInfo, idbVersion) {
	const [db, setDb] = useState(undefined);

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
