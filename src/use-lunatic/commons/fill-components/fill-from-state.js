function fillFromState(component, state) {
	const { handleChange, executeExpression, preferences, custom } = state;
	return { ...component, handleChange, executeExpression, preferences, custom };
}

export default fillFromState;
