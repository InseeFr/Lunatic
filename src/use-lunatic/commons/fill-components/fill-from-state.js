function fillFromState(component, state) {
	const { handleChange, executeExpression, preferences, goToPage, custom } =
		state;
	return {
		...component,
		handleChange,
		executeExpression,
		preferences,
		goToPage,
		custom,
	};
}

export default fillFromState;
