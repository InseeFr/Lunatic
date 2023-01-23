function fillFromState(component, state) {
	const { handleChange, executeExpression, preferences, goToPage } = state;
	return {
		...component,
		handleChange,
		executeExpression,
		preferences,
		goToPage,
	};
}

export default fillFromState;
