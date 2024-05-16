import type { FillerDefinition } from '../../type.source';
import type { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LunaticChangesHandler } from '../type';

type Args = {
	variables: LunaticVariablesStore;
	fillers: FillerDefinition[];
	handleChanges: LunaticChangesHandler;
	fetchMock:
		| null
		| ((data: Record<string, unknown>) => Promise<Record<string, unknown>>);
};

/**
 * Behaviour that fills variables from a server when some variables are collected
 * The filling happens when the user move forward in the form
 */
export function useFillers({
	variables,
	fillers,
	handleChanges,
	fetchMock,
}: Args) {
	const watchedVariables = useMemo(
		() => buildWatchedVariableMap(fillers),
		[fillers]
	);
	const activeFillers = useRef(new Set<FillerDefinition>()); // List fillers that should be triggerred in the next navigation
	const [isFilling, setFilling] = useState<boolean>(false);

	// Listen for change on variables to detect if a filler need to be triggered on next page change
	useEffect(() => {
		const listener = (
			e: CustomEvent<{
				name: string;
			}>
		) => {
			if (watchedVariables.has(e.detail.name)) {
				activeFillers.current.add(watchedVariables.get(e.detail.name)!);
			}
		};
		variables.on('change', listener);
		return () => {
			variables.off('change', listener);
		};
	}, [variables, watchedVariables]);

	// Trigger fillers
	const triggerFillers = useCallback(async () => {
		if (activeFillers.current.size === 0) {
			return;
		}
		setFilling(true);
		Promise.all(
			Array.from(activeFillers.current).map((filler) => {
				const values = Object.fromEntries(
					filler.responses.map((r) => [r.name, variables.get(r.name)])
				);
				return fetchFillerData(filler, values, fetchMock).then((data) => {
					handleChanges(
						Object.entries(data).map((d) => ({
							name: d[0],
							value: d[1],
						}))
					);
				});
			})
		)
			.catch((e) => {
				console.error(e);
				alert(e);
			})
			.finally(() => {
				setFilling(false);
				activeFillers.current.clear();
			});
	}, [activeFillers, variables, handleChanges]);

	return {
		triggerFillers,
		isFilling,
	};
}

/**
 * Creates a map of FillerDefinition indexed by variable name (improves performance)
 */
function buildWatchedVariableMap(
	definitions: FillerDefinition[]
): Map<string, FillerDefinition> {
	const map = new Map<string, FillerDefinition>();
	for (const definition of definitions) {
		for (const response of definition.responses) {
			map.set(response.name, definition);
		}
	}
	return map;
}

/**
 * Fetch new data from the server (use mock if it exists)
 */
function fetchFillerData(
	filler: FillerDefinition,
	data: Record<string, unknown>,
	mock:
		| null
		| ((data: Record<string, unknown>) => Promise<Record<string, unknown>>)
): Promise<Record<string, unknown>> {
	if (mock) {
		return mock(data);
	}

	return fetch(filler.endpoint.url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	}).then((res) => res.json());
}
