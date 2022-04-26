function getSafetyExpression(expression) {
	if (typeof expression === 'string') {
		return { value: expression, type: 'VTL|MD' };
	}

	return expression;
}

export default getSafetyExpression;
