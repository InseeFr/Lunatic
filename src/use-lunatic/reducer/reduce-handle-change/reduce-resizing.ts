import { getCompatibleVTLExpression } from '../../commons';
import { resizeArrayVariable } from '../commons';
import type { LunaticState } from '../../type';
import { type ActionHandleChange } from '../../actions';

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
	onChange?: Required<ActionHandleChange['payload']>['args']['onChange'];
}) {
	if (size === undefined) {
		return {};
	}
	const newSize = executeExpression<number>(getCompatibleVTLExpression(size));
	return variableArray.reduce((acc, v) => {
		if (v in variables) {
			const { value } = variables[v];
			const newValue = resizeArrayVariable(value, newSize);
			// Variable had the right size, do nothing
			if (newValue === value) {
				return acc;
			}
			updateBindings(v, newValue);
			return {
				...acc,
				[v]: { ...variables[v], value: newValue },
			};
		}
		return acc;
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
			// Variable had the right size, do nothing
			if (newValue === value) {
				return acc;
			}
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
	const name = action.payload.response.name;
	const onChange = action.payload.args?.onChange;
	const { resizing, variables } = state;
	const updateBindings = (variableName: string, newValue: unknown) => {
		state.updateBindings(variableName, newValue);
		action.payload.args?.onChange?.(
			{ name: variableName },
			newValue,
			action.payload.args
		);
	};
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
			onChange,
		});
		return {
			...state,
			variables: { ...variables, ...newLinksVariables, ...newVariables },
		};
	}
	return state;
}

export default reduceResizing;
