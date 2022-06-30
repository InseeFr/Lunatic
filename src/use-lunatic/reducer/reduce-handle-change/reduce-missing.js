import reduceCleaning from './reduce-cleaning';

function buildMissingValue(state, oldValue) {
	const {
		pager: { iteration },
	} = state;
	// Root question
	if (iteration === undefined) return null;
	// Loop question
	const newValue = [...oldValue];
	newValue[iteration] = null;
	return newValue;
}

function reduceMissing(state, action) {
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
		const newStateAfterCleaning = toClean.reduce(
			(acc, v) => reduceCleaning(acc, { payload: { response: { name: v } } }),
			newStateAfterMissing
		);
		return newStateAfterCleaning;
	}
	return state;
}

export default reduceMissing;
