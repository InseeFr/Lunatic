function getSafetyExpression(expression) {
	if (typeof expression === 'string') {
		return { value: expression, type: 'VTL' };
	}
	// TODO: fix into model and supress this block
	if (
		typeof expression === 'object' &&
		'value' in expression &&
		!('type' in expression)
	) {
		return { ...expression, type: 'VTL' };
	}

	return expression;
}

export default getSafetyExpression;
