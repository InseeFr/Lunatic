import { interpret } from '@inseefr/trevas';

const extractDSValue = (v) => {
	if (v !== null && typeof v === 'object') {
		const { dataPoints } = v;
		return Object.values(dataPoints)[0] || null;
	}
	return v;
};

export const interpretVTL = (bindings) => (expression) => {
	try {
		const res = interpret(expression, bindings);
		return extractDSValue(res);
	} catch (e) {
		return expression;
	}
};
