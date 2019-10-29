import { interpret as interpretVtl } from '@inseefr/vtl-tools';

export const interpret = features => bindings => expression => {
	if (features.includes('VTL')) {
		try {
			return interpretVtl(expression, bindings);
		} catch (e) {
			return `VTL interpret error for expression: ${expression}`;
		}
	}
	return expression;
};
