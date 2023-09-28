import { useCallback, useRef } from 'react';
import { useRefSync } from './use-ref-sync';
import { getQuestionnaireData } from '../use-lunatic/commons/get-data';

type getDataType = (
	withRefreshedCalculated: boolean,
	variableNames?: string[]
) => ReturnType<typeof getQuestionnaireData>;

/**
 * Allow tracking changed while interacting with Lunatic forms
 */
export function useTrackChanges(enabled: boolean, getData: getDataType) {
	// Saves the list of changed variable
	const changedVariables = useRef(new Set<string>());
	// Use ref to avoid dependencies in useCallback
	const enabledRef = useRefSync(enabled);
	const getDataRef = useRefSync(getData);

	// Add a new variable in the changeList
	const addChange = useCallback(
		(name: string) => {
			if (enabledRef.current) {
				changedVariables.current.add(name);
			}
		},
		[enabledRef, changedVariables]
	);

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
			const data = getDataRef.current(
				false,
				Array.from(changedVariables.current)
			);
			if (reset) {
				resetChangedData();
			}
			return data;
		},
		[enabledRef, getDataRef, resetChangedData]
	);

	return {
		addChange,
		getChangedData,
		resetChangedData,
	};
}
