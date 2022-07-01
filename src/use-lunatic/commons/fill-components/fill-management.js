function fillManagement(component, state) {
	const { management } = state;
	if (management) {
		return { ...component, management };
	}
	return component;
}

export default fillManagement;
