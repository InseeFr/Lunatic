import type { LunaticVariablesStore } from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type-source';
import { forceInt } from '../../../../utils/number';
import { resizeArrayVariable } from '../../../reducer/commons';

/**
 * Resizing behaviour for the store
 * When a variable changes, multiple other variables can change size (size of the array)
 */
export function resizingBehaviour(
	store: LunaticVariablesStore,
	resizing: LunaticSource['resizing']
) {
	if (!resizing) {
		return;
	}

	// Create a map to improve performance
	const resizingMap = new Map(Object.entries(resizing));

	store.on('change', (e) => {
		// The variable does not have resizing
		const resizingInfo = resizingMap.get(e.detail.name);
		if (!resizingInfo) {
			return;
		}

		const newSize = forceInt(store.run(resizingInfo.size));
		for (const variableName of resizingInfo.variables) {
			const value = store.get(variableName);
			if (!Array.isArray(value) || value.length !== newSize) {
				store.set(variableName, resizeArrayVariable(value, newSize, null));
			}
		}
	});
}
