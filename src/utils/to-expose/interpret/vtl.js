import { interpret } from '@inseefr/trevas';

export const interpretVTL = (bindings, doNotReplaceNullBindings) => (
	expression
) => {
	try {
		const VTLExpr = interpret(
			expression,
			doNotReplaceNullBindings ? bindings : replaceNullBindings(bindings)
		);
		if (!VTLExpr) return expression;
		return VTLExpr;
	} catch (e) {
		return expression;
	}
};

export const interpretVTLWithEmptyDefault = (
	bindings,
	doNotReplaceNullBindings
) => (expression) => {
	try {
		const VTLExpr = interpret(
			expression,
			doNotReplaceNullBindings ? bindings : replaceNullBindings(bindings, '')
		);
		if (!VTLExpr) return '';
		return VTLExpr;
	} catch (e) {
		return '';
	}
};

export const replaceNullBindings = (bindings, defaultValue) =>
	bindings
		? Object.entries(bindings).reduce(
				(acc, [key, value]) => ({
					...acc,
					[key]: value === null ? defaultValue || key : value,
				}),
				{}
		  )
		: {};
