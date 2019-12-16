import { interpret as interpretVtl } from '@inseefr/vtl-tools';

export const interpret = features => bindings => expression => {
	if (!expression) return '';
	if (!Array.isArray(features)) return expression;

	if (features.includes('VTL')) {
		try {
			const VTLExpr = interpretVtl(expression, bindings);
			if (!VTLExpr) return expression;
			return VTLExpr;
		} catch (e) {
			return expression;
		}
	}
	return expression;
};
