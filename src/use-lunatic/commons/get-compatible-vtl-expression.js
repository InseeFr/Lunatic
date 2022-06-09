function getCompatibleVTLExpression(expression) {
	if (typeof expression === 'string') {
		return { value: expression, type: 'VTL' };
	}
	if (typeof expression === 'object') {
		const { type } = expression;
		if (type === 'VTL') {
			return expression;
		}
	}
	throw new Error(`Non-VTL compatible expression : ${expression}`);
}

export default getCompatibleVTLExpression;
