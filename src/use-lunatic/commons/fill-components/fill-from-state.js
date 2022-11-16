function fillFromState(component, state) {
	const { handleChange, executeExpression, preferences, initComponent } = state;

	return {
		...component,
		handleChange,
		executeExpression,
		preferences,
		initComponent,
	};
}

export default fillFromState;
