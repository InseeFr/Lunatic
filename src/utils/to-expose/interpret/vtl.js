import { interpret } from '@inseefr/trevas';

export const interpretVTL = (bindings) => (expression) => {
	try {
		return interpret(expression, bindings);
	} catch (e) {
		return expression;
	}
};
