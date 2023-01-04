import { getCompatibleVTLExpression } from '../../commons';
import { resizeArrayVariable } from '../commons';

/**
 * A discutrer de l'intérêt de dissocier les 2 cas.
 * @param {*} size
 * @param {*} precSize
 * @param {*} value
 * @returns
 */
function refillValue(size, precSize, value) {
	if (precSize > size) {
		return new Array(size).fill(null);
	}
	return resizeArrayVariable(value, size, null);
	// return new Array(size).fill(null);
}

function reduceResizingVariables({
	size,
	variableArray,
	variables,
	executeExpression,
	updateBindings,
}) {
	if (size !== undefined) {
		const sizeValue = executeExpression(getCompatibleVTLExpression(size));

		return variableArray.reduce((acc, v) => {
			if (v in variables) {
				const { value } = variables[v];
				const precSize = Array.isArray(value) ? value.length : 0;
				const newValue = refillValue(sizeValue, precSize, value);
				// const newValue = resizeArrayVariable(value, sizeValue, null);
				updateBindings(v, newValue);
				return {
					...acc,
					[v]: { ...variables[v], value: newValue },
				};
			}
			return acc;
		}, {});
	}
	return {};
}

function reduceResizingLinksVariables({
	sizeForLinksVariables,
	linksVariables,
	variables,
	executeExpression,
	updateBindings,
}) {
	if (Array.isArray(sizeForLinksVariables)) {
		const [xSize, ySize] = sizeForLinksVariables.map((s) => {
			return executeExpression(getCompatibleVTLExpression(s));
		});
		return linksVariables.reduce((acc, v) => {
			const { value } = variables[v];
			const newValue = resizeArrayVariable(
				value.map((i) => resizeArrayVariable(i, ySize, null)),
				xSize,
				new Array(ySize).fill(null)
			);
			updateBindings(v, newValue);
			return {
				...acc,
				[v]: { ...variables[v], value: newValue },
			};
		}, {});
	}
	return {};
}

function reduceResizing(state, action) {
	const {
		payload: {
			response: { name },
		},
	} = action;
	const { resizing, variables, updateBindings } = state;

	if (name in resizing) {
		const {
			size,
			variables: variableArray,
			sizeForLinksVariables,
			linksVariables,
		} = resizing[name];
		const { executeExpression } = state;

		const newLinksVariables = reduceResizingLinksVariables({
			sizeForLinksVariables,
			linksVariables,
			variables,
			executeExpression,
			updateBindings,
		});
		const newVariables = reduceResizingVariables({
			size,
			variableArray,
			variables,
			executeExpression,
			updateBindings,
		});
		return {
			...state,
			variables: { ...variables, ...newLinksVariables, ...newVariables },
		};
	}
	return state;
}

export default reduceResizing;
