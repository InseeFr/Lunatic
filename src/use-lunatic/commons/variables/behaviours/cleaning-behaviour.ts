import type { LunaticVariablesStore } from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type-source';

/**
 * Cleaning behaviour for the store
 * When a variable changes, other variables can be reset
 */
export function cleaningBehaviour(
	store: LunaticVariablesStore,
	cleaning: LunaticSource['cleaning'],
	initialValues: Record<string, unknown> = {}
) {
	if (!cleaning) {
		return;
	}

	// Create a map to improve performance
	const cleaningMap = new Map(Object.entries(cleaning));

	store.on('change', (e) => {
		const cleaningInfo = cleaningMap.get(e.detail.name);

		// The variable does not have cleaning
		if (!cleaningInfo) {
			return;
		}

		for (const variableName in cleaningInfo) {
			try {
				const skipCleaning = store.run(cleaningInfo[variableName], {
					iteration: e.detail.iteration,
				});
				if (skipCleaning) {
					continue;
				}

				store.set(variableName, initialValues[variableName] ?? null, {
					iteration: e.detail.iteration,
				});
			} catch (e) {
				// If we have an error, skip this cleaning
				console.error(e);
			}
		}
	});
}
