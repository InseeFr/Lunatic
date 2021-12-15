import { interpret } from '@inseefr/trevas';

function isDataSet(result) {
	return result && typeof result === 'object' && result.dataPoints;
}

function extractDataSetResult(dataSet) {
	const { dataPoints } = dataSet;
	if (dataPoints) {
		const { result } = dataPoints;
		return result;
	}
	return undefined;
}

function executeVtl(expression, vtlBindings) {
	const result = interpret(expression, vtlBindings);

	if (isDataSet(result)) {
		return extractDataSetResult(result);
	}

	return result;
}
//[name]: { dataStructure: { [name]: {} }, dataPoints: { [name]: value } },
function executeExpression(vtlBindings, expression, features /* VTL, MD */) {
	if (expression) {
		try {
			if (features.includes('VTL')) {
				return executeVtl(expression, vtlBindings);
			}
			return expression;
		} catch (e) {
			// expression en erreur ou simple chaîne dee caractère
			if (process.env.NODE_ENV === 'development') {
				console.warn(`VTL error :  ${expression}`);
				console.warn(e);
			}
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
