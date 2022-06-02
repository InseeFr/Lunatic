function fillMissingResponse(component, state) {
	const { missingResponse } = component;
	const {
		variables,
		pager: { iteration },
	} = state;
	if (missingResponse) {
		const { name } = missingResponse;
		if (name in variables) {
			const { value } = variables[name];
			const missingValue = iteration === undefined ? value : value[iteration];
			return {
				...component,
				missingResponse: { ...missingResponse, value: missingValue },
			};
		}
	}

	return component;
}

export default fillMissingResponse;
