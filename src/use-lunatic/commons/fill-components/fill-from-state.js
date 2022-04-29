function fillFromState(component, state) {
	const { handleChange, executeExpression, preferences } = state;
	return { ...component, handleChange, executeExpression, preferences };
}

export default fillFromState;
