import { useCallback, useState } from 'react';
import { getEntity, openDb } from '../utils/idb-tools';
import type { SuggesterType } from '../use-lunatic/type-source';
import { STORE_INFO_NAME } from '../constants/indexedDBStore';

type State =
	| {
			type: 'Loading';
	  }
	| {
			type: 'Ready';
			info: SuggesterType;
	  }
	| {
			type: 'Loading';
	  }
	| {
			type: 'Error';
	  };

/**
 * Retrieves suggester info from indexedDB
 */
export function useSuggesterInfo(storeName: string, version: string) {
	const [state, setState] = useState<State>({
		type: 'Loading',
	});
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
					setState({ type: 'Ready', info: info });
				}
			} catch (e) {
				setState({ type: 'Error' });
			}
		},
		[storeName, version]
	);

	return {
		state: state.type,
		infos: 'info' in state ? state.info : undefined,
		fetchInfos,
	};
}
