import type { LunaticVariablesStore } from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type';
import { depth } from '../../../../utils/array';

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
		const iteration = e.detail.iteration;

		// The variable does not have cleaning
		if (!cleaningInfo) {
			return;
		}

		for (const variableName in cleaningInfo) {
			try {
				const skipCleaning = store.run(cleaningInfo[variableName], {
					iteration,
				});
				if (skipCleaning) {
					continue;
				}

				// Variable may be top level, so we need to deduce expected iteration
				const variableDepth = depth(initialValues[variableName]);
				const variableIteration =
					variableDepth === 0
						? undefined
						: iteration?.slice(0, depth(initialValues[variableName]));

				store.set(
					variableName,
					getValueAtIteration(initialValues[variableName], variableIteration),
					{
						iteration: variableIteration,
					}
				);
			} catch (e) {
				// If we have an error, skip this cleaning
				console.error(e);
			}
		}
	});
}

function getValueAtIteration(value: unknown, iteration?: number[]) {
	if (!iteration || iteration.length === 0) {
		return value ?? null;
	}

	if (!Array.isArray(value)) {
		return null;
	}

	return getValueAtIteration(value[iteration[0]], iteration.slice(1));
}
