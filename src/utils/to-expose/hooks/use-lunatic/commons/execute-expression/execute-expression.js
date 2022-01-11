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
	} else if (typeof result === 'object') {
		return expression;
	}

	return result;
}

function loggingDefault(expression, bindings, e) {
	if (process.env.NODE_ENV === 'development') {
		console.warn(`VTL error :  ${expression}`, bindings);
		console.warn(e);
	}
}

function executeExpression(
	vtlBindings,
	expression,
	features /* VTL, MD */,
	logging = loggingDefault
) {
	if (expression) {
		try {
			if (features.includes('VTL')) {
				const result = executeVtl(expression, vtlBindings);

				// console.log({ expression, result, vtlBindings });
				return result;
			}
			return expression;
		} catch (e) {
			// expression en erreur ou simple chaîne de caractère
			logging(expression, vtlBindings, e);
			return expression;
		}
		// TODO MD only for labels, not for filtering
	}
	return '';
}

export default executeExpression;
