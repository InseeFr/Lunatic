import {
	DynamicExpression,
	DynamicExpressionLanguage,
} from '../../type.source';

export function getExpressionType(
	expression: string | DynamicExpression
): DynamicExpressionLanguage {
	if (typeof expression === 'string') {
		return 'TXT';
	}
	if (expression && typeof expression === 'object' && 'type' in expression) {
		return expression.type;
	}
	return 'TXT';
}

export function getExpressionAsString(expression: unknown): string {
	if (typeof expression === 'string' || typeof expression === 'number') {
		return expression.toString();
	}
	if (
		expression &&
		typeof expression === 'object' &&
		'value' in expression &&
		(typeof expression.value === 'string' ||
			typeof expression.value === 'number')
	) {
		return expression.value.toString();
	}
	return '';
}
