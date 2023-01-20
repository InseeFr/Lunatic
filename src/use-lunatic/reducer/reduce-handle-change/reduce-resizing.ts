import { getCompatibleVTLExpression } from '../../commons';
import { resizeArrayVariable } from '../commons';
import { LunaticState } from '../../type';
import { ActionHandleChange } from '../../actions';

function reduceResizingVariables({
	size,
	variableArray,
	variables,
	executeExpression,
	updateBindings,
}: {
	size?: string;
	variableArray: string[];
	variables: LunaticState['variables'];
	executeExpression: LunaticState['executeExpression'];
	updateBindings: LunaticState['updateBindings'];
}) {
	if (size === undefined) {
		return {};
	}
	const sizeValue = executeExpression<number>(getCompatibleVTLExpression(size));
	return variableArray.reduce((acc, v) => {
		const { value } = variables[v];
		const newValue = resizeArrayVariable(value, sizeValue, null);
		updateBindings(v, newValue);
		return {
			...acc,
			[v]: { ...variables[v], value: newValue },
		};
	}, {});
}

function reduceResizingLinksVariables({
	sizeForLinksVariables,
	linksVariables,
	variables,
	executeExpression,
	updateBindings,
}: {
	sizeForLinksVariables: unknown;
	linksVariables?: string[];
	variables: LunaticState['variables'];
	executeExpression: LunaticState['executeExpression'];
	updateBindings: LunaticState['updateBindings'];
}) {
	if (Array.isArray(sizeForLinksVariables) && linksVariables) {
		const [xSize, ySize] = sizeForLinksVariables.map((s) => {
			return executeExpression<number>(getCompatibleVTLExpression(s));
		});
		return linksVariables.reduce((acc, v) => {
			const { value } = variables[v];
			// The value is not an array, skip it
			if (!Array.isArray(value)) {
				return acc;
			}
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

function reduceResizing(state: LunaticState, action: ActionHandleChange) {
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
