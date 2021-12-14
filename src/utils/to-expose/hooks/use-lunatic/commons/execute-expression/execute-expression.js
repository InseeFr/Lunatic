import { interpret } from '@inseefr/trevas';

function executeVtl(expression, vtlBindings) {
	const result = interpret(expression, vtlBindings);
	if (typeof result === 'object') {
		const {
			dataPoints: [value],
		} = result;
		return Object.values(value);
	}
	return result;
}

function executeExpression(vtlBindings, expression, features /* VTL, MD */) {
	if (expression) {
		try {
			if (features.includes('VTL')) {
				return executeVtl(expression, vtlBindings);
			}
			return expression;
		} catch (e) {
			// expression en erreur ou simple chaîne dee caractère
			return expression;
		}
		// TODO MD only for labels, not for filtering
	}
	return '';
}

export default executeExpression;

// if (!expression) return '';
// if (!Array.isArray(features)) return expression;
// if (features.includes('VTL')) {
// 	const vtl = interpretVTL(bindings)(expression);
// 	if (features.includes('MD')) {
// 		return interpretMD(vtl)(logFunction);
// 	}
// 	return vtl;
// }
// return expression;

// const extractDSValue = (v) => {
// 	if (v !== null && typeof v === 'object') {
// 		const { dataPoints } = v;
// 		return Object.values(dataPoints)[0];
// 	}
// 	return v;
// };
