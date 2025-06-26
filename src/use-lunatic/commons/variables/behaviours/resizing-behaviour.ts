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
	console.debug(resizingMap);

	store.on('change', (e) => {
		if (e.detail.name === 'NBSAL_INT')
			console.debug('[resizingBehaviour change]', e.detail.name);
		// The variable does not have resizing
		const resizingInfo = resizingMap.get(e.detail.name);
		if (e.detail.name === 'NBSAL_INT')
			console.log('[resizingInfo]', resizingInfo);
		if (!resizingInfo) {
			return;
		}

		// Pairwise resizing
		if ('sizeForLinksVariables' in resizingInfo) {
			resizePairwise(store, resizingInfo);
			if (!('size' in resizingInfo)) {
				return;
			}
		}

		if (!resizingInfo.size) {
			throw new Error(`Cannot resize ${e.detail.name} missing "size" property`);
		}

		const newSize = forceInt(store.run(resizingInfo.size));
		if (e.detail.name === 'NBSAL_INT')
			console.debug('[NBSAL_INT newSize]', newSize);
		for (const variableName of resizingInfo.variables) {
			// Since data can change after the resize, we need to pass a callback that will use the last value of the variable for the resize
			store.enqueueSet(
				variableName,
				() => {
					const value = store.get(variableName);
					if (variableName === 'PRES_SAL')
						console.debug('[enqueueSet]', variableName, value, newSize);
					if (!Array.isArray(value) || value.length !== newSize) {
						return resizeArrayVariable(value, newSize, null);
					}
					return value;
				},
				{
					cause: 'resizing',
				}
			);
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
		const value = store.get(variable);
		const resizedValue = resizeArray(
			// The value is not an array, force an array
			Array.isArray(value) ? value.map((i) => resizeArray(i, ySize, null)) : [],
			xSize,
			new Array(ySize).fill(null)
		);
		store.enqueueSet(variable, resizedValue);
	});
}
