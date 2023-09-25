import type { LunaticVariablesStore } from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type-source';

/**
 * Add missing behaviour to the store
 * Missing works as a simplified cleaning that reset a linked variable
 */
export function missingBehaviour(
	store: LunaticVariablesStore,
	missing: LunaticSource['missingBlock']
) {
	// Create a map to improve performance
	const missingMap = new Map(Object.entries(missing));

	store.on('change', (e) => {
		// Only clean if a value is set
		if (e.detail.value === null || e.detail.value === undefined) {
			return;
		}

		const linkedVariables = missingMap.get(e.detail.name);

		// The variable does not have missing variable linked
		if (!linkedVariables) {
			return;
		}

		for (const variableName of linkedVariables) {
			store.set(variableName, null, { iteration: e.detail.iteration });
		}
	});
}
