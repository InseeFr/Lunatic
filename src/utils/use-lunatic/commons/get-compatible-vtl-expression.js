function getCompatibleVTLExpression(expression) {
	if (typeof expression === 'string') {
		return { value: expression, type: 'VTL|MD' };
	}
	if (typeof expression === 'object') {
		const { type } = expression;
		if (expression === 'VTL') {
			return expression;
		}
	}
	throw new Error(`Non-VTL compatible expression : ${expression}`);
}

export default getCompatibleVTLExpression;
