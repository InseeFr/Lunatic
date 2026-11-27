import { DynamicExpression } from '../../type.source';

type FeatureLanguage = 'TXT' | 'VTL' | 'CEL' | 'MD';

export function getExpressionLanguagesFeatures(
	expression: string | DynamicExpression
): FeatureLanguage[] {
	if (expression && typeof expression === 'object' && 'type' in expression) {
		return expression.type.split('|') as FeatureLanguage[];
	}
	// legacy, fallback to VTL
	return ['VTL'];
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
