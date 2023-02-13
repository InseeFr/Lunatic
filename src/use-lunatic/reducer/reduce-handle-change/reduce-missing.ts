import reduceCleaning from './reduce-cleaning';
import { LunaticState } from '../../type';
import { ActionHandleChange, ActionKind } from '../../actions';

/**
 * Find the new value for a variable from the state
 *
 * If we are in a loop we only want to null the value corresponding to the iteration
 */
function buildMissingValue(state: LunaticState, oldValue: unknown) {
	const {
		pager: { iteration },
	} = state;
	// The question is a root question
	if (iteration === undefined) {
		return null;
	}

	// We are in an iteration
	// If the value is not an array, do nothing
	if (!Array.isArray(oldValue)) {
		return oldValue;
	}
	// Otherwise, null the value for the iteration
	const newValue = [...oldValue];
	newValue[iteration] = null;
	return newValue;
}

/**
 * Update value for missing variables
 */
function reduceMissing(
	state: LunaticState,
	action: ActionHandleChange
): LunaticState {
	const {
		payload: {
			response: { name },
		},
	} = action;
	const { missingBlock } = state;
	if (name in missingBlock) {
		const { variables, updateBindings } = state;
		const toClean = missingBlock[name];
		const delta = toClean.reduce((acc, variableName) => {
			const { value, ...rest } = variables[variableName];
			updateBindings(variableName, null);
			const newValue = buildMissingValue(state, value);
			return { ...acc, [variableName]: { ...rest, value: newValue } };
		}, {});
		const newStateAfterMissing = {
			...state,
			variables: { ...variables, ...delta },
		};
		// If missing clean variable which is also into cleaning case,
		// we have to handle theses cleanings
		// To check: do we have with this trick or triggering handle change action?
		return toClean.reduce(
			(acc, v) =>
				reduceCleaning(acc, {
					type: ActionKind.HANDLE_CHANGE,
					payload: { ...action.payload, response: { name: v } },
				}),
			newStateAfterMissing
		);
	}
	return state;
}

export default reduceMissing;
