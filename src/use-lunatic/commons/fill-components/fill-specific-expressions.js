function resolveRoundabout(component, state) {
	const { executeExpression } = state;
	const { componentType } = component;

	if (componentType === 'Roundabout') {
		const { iterations, expressions } = component;
		const compiled = Object.entries(expressions).reduce(function (
			result,
			[name, expression]
		) {
			const values = new Array(iterations).fill(null).map((_, iteration) => {
				return executeExpression(expression, { iteration });
			});
			return { ...result, [name]: values };
		},
		{});
		return { ...component, expressions: compiled };
	}

	return component;
}

function fillSpecificExpressions(component, state) {
	return resolveRoundabout(component, state);
}

export default fillSpecificExpressions;
