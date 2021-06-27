import { interpretVTL } from './vtl';
import { interpretMD } from './md';

export const interpret =
	(features, logFunction) => (bindings) => (expression) => {
		if (!expression) return '';
		if (!Array.isArray(features)) return expression;
		if (features.includes('VTL')) {
			const vtl = interpretVTL(bindings)(expression);
			if (features.includes('MD')) {
				return interpretMD(vtl)(logFunction);
			}
			return vtl;
		}
		return expression;
	};
