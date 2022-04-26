function fillErrors(component, state) {
	const { errors } = state;
	const { id } = component;
	if (errors) {
		// TODO only keep criticality info
		if (id in errors) {
			return { ...component, error: errors[id] };
		}
	}
	return component;
}

export default fillErrors;
