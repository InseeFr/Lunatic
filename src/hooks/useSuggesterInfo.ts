import { useCallback, useEffect, useState } from 'react';
import { getEntity, openDb } from '../utils/idb-tools';
import type { SuggesterType } from '../use-lunatic/type-source';
import { STORE_INFO_NAME } from '../constants/indexedDBStore';

export function useSuggesterInfo(storeName: string, version: string) {
	const [infos, setInfos] = useState<SuggesterType>();
	const [state, setState] = useState<'Loading' | 'Ready' | 'Error'>('Loading');
	const fetchInfos = useCallback(
		async function () {
			try {
				const db = await openDb(storeName, parseInt(version, 10));
				const info = (await getEntity(
					db,
					STORE_INFO_NAME,
					storeName
				)) as SuggesterType;
				if (db && info) {
					setState('Ready');
					setInfos(info);
				}
			} catch (e) {
				setState('Error');
			}
		},
		[storeName, version]
	);

	return { infos, state, fetchInfos };
}
