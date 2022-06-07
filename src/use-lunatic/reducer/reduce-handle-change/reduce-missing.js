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
		return { ...state, variables: { ...variables, ...delta } };
	}
	return state;
}

export default reduceMissing;
