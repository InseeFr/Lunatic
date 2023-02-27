import reduceCleaning from './reduce-cleaning';
import { LunaticState } from '../../type';
import { ActionHandleChange, ActionKind } from '../../actions';
import { deepSet } from '../../../utils/array';

/**
 * Build the missing value from the state
 */
function buildMissingValue(state: LunaticState, oldValue: unknown) {
	const pager = state.pager;
	if (pager.iteration === undefined) {
		return null;
	}

	// The value is not an array we can't proceed further
	if (!Array.isArray(oldValue)) {
		return oldValue;
	}

	return deepSet(oldValue, null, pager.iteration, pager.maxIteration);
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
