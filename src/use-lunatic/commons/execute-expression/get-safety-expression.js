function getSafetyExpression(expression) {
	if (typeof expression === 'string') {
		return { value: expression, type: 'VTL|MD' };
	}
	// TODO: fix into model and supress this block
	if (
		typeof expression === 'object' &&
		'value' in expression &&
		!('type' in expression)
	) {
		return { ...expression, type: 'VTL|MD' };
	}

	return expression;
}

export default getSafetyExpression;
