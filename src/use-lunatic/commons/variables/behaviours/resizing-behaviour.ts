import type { LunaticVariablesStore } from '../lunatic-variables-store';
import type { LunaticSource } from '../../../type';
import { forceInt } from '../../../../utils/number';
import { resizeArrayVariable } from '../../../reducer/commons';
import { getExpressionAsString } from '../../../../utils/vtl';
import { resizeArray } from '../../../../utils/array';

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

		// Pairwise resizing
		if ('sizeForLinksVariables' in resizingInfo) {
			resizePairwise(store, resizingInfo, e.detail);
			if (!('size' in resizingInfo)) {
				return;
			}
		}

		if (!resizingInfo.size) {
			throw new Error(`Cannot resize ${e.detail.name} missing "size" property`);
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

function resizePairwise(
	store: LunaticVariablesStore,
	resizingInfo: {
		sizeForLinksVariables:
			| [string, string]
			| { xAxisSize: string; yAxisSize: string };
		linksVariables: string[];
	},
	args: {
		iteration?: number[];
	}
) {
	// Handle expression being sent as an array or an object (ensure backward compatibility)
	// Issue : https://github.com/InseeFr/Lunatic/issues/883
	const sizeExpressions: [string, string] = Array.isArray(
		resizingInfo.sizeForLinksVariables
	)
		? resizingInfo.sizeForLinksVariables
		: [
				resizingInfo.sizeForLinksVariables.xAxisSize,
				resizingInfo.sizeForLinksVariables.yAxisSize,
			];
	const [xSize, ySize] = sizeExpressions.map((expression) => {
		return forceInt(store.run(getExpressionAsString(expression)));
	});
	resizingInfo.linksVariables.forEach((variable) => {
		const value = store.get(variable, args.iteration);
		const resizedValue = resizeArray(
			// The value is not an array, force an array
			Array.isArray(value) ? value.map((i) => resizeArray(i, ySize, null)) : [],
			xSize,
			new Array(ySize).fill(null)
		);
		store.set(variable, resizedValue);
	});
}
