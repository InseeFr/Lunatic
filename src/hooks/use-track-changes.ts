import { useCallback, useEffect, useRef } from 'react';
import { useRefSync } from './use-ref-sync';
import type {
	LunaticVariablesStore,
	LunaticVariablesStoreEvent,
} from '../use-lunatic/commons/variables/lunatic-variables-store';
import type { LunaticData } from '../use-lunatic/type';

/**
 * Allow tracking changed while interacting with Lunatic forms
 */
export function useTrackChanges(
	enabled: boolean,
	store: LunaticVariablesStore,
	getData: (names: string[]) => LunaticData
) {
	// Saves the list of changed variable
	const changedVariables = useRef(new Set<string>());
	// Use ref to avoid dependencies in useCallback
	const enabledRef = useRefSync(enabled);
	const getDataRef = useRefSync(getData);

	useEffect(() => {
		if (!enabled || !store) {
			return;
		}
		const handleChange = (e: LunaticVariablesStoreEvent<'change'>) => {
			changedVariables.current.add(e.detail.name);
		};
		store.on('change', handleChange);
		return () => store.off('change', handleChange);
	}, [enabled, store]);

	// Reset list of changed variables
	const resetChangedData = useCallback(() => {
		changedVariables.current.clear();
	}, [changedVariables]);

	const getChangedData = useCallback(
		(reset: boolean = false) => {
			if (!enabledRef.current) {
				throw new Error(
					'getChangedData() cannot be used without enabling tracking mode, add "trackChanges: true" to useLunatic options'
				);
			}
			const data = getDataRef.current(Array.from(changedVariables.current));
			if (reset) {
				resetChangedData();
			}
			return data;
		},
		[enabledRef, getDataRef, resetChangedData]
	);

	return {
		getChangedData,
		resetChangedData,
	};
}
