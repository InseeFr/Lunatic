import { getCompatibleVTLExpression } from '../../commons';
import type { LunaticState, LunaticStateVariable } from '../../type';
import { type ActionHandleChange } from '../../actions';
import { objectMap } from '../../../utils/object';

/**
 * Reset variables to null using the cleaning definition in the source.json
 */
function reduceCleaning(
	state: LunaticState,
	action: ActionHandleChange
): LunaticState {
	const response = action.payload.response;
	const { executeExpression, cleaning, updateBindings, variables, pager } =
		state;
	const { iteration } = pager;
	if (!response || !(response.name in cleaning)) {
		return state;
	}

	const expressions = cleaning[response.name];
	const cleanedVariables = objectMap(
		expressions,
		(variableName, skipExpression) => {
			const skipCleaning = executeExpression<boolean>(
				getCompatibleVTLExpression(skipExpression),
				{ iteration }
			);

			if (skipCleaning || !(variableName in variables)) {
				return null;
			}

			const variableRoot = variables[variableName];
			const initialValue = cleanedValue(variables[variableName], iteration);
			updateBindings(variableName.toString(), initialValue);
			return [variableName, { ...variableRoot, value: initialValue }];
		}
	);
	//TODO lastReachedPage cleaning
	return {
		...state,
		variables: {
			...variables,
			...cleanedVariables,
		},
	};
}

function cleanedValue(
	variable: LunaticStateVariable,
	iteration: number | undefined
): unknown {
	let initialValue = null;
	if (variable.variable && 'values' in variable.variable) {
		initialValue = variable.variable.values.COLLECTED ?? null;
	}

	if (!iteration || !Array.isArray(variable.value)) {
		return initialValue;
	}

	// Within an iteration we only want to clean the value for this specific iteration
	const newValue = [...variable.value];
	newValue[iteration] = Array.isArray(initialValue)
		? initialValue[iteration] ?? null
		: null;
	return newValue;
}

export default reduceCleaning;
