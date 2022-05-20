function fillMissingResponse(component, state) {
	const { missingResponse } = component;
	const { variables } = state;

	if (missingResponse) {
		const { name } = missingResponse;
		if (name in variables) {
			const { value } = variables[name];
			return { ...component, missingResponse: { ...missingResponse, value } };
		}
	}

	return component;
}

export default fillMissingResponse;
