import React from 'react';
import { interpret } from '@inseefr/trevas';
import MdLabel from '../../../components/commons/components/md-label';
import getVtlCompatibleValue from '../../../utils/vtl';
import { VTL, MD } from '../../../utils/constants';

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

export function executeVtlExpression(expression, vtlBindings) {
	const legalVtlBindings = Object.entries(vtlBindings).reduce(
		(acc, [k, v]) => ({ ...acc, [k]: getVtlCompatibleValue(v) }),
		{}
	);
	const result = interpret(expression, legalVtlBindings);
	if (isDataSet(result)) {
		return extractDataSetResult(result);
	}
	if (result === null) {
		return null;
	}
	if (typeof result === 'object') {
		return expression;
	}

	return result;
}

function executeVTL(expression, vtlBindings, logging) {
	if (expression) {
		try {
			return executeVtlExpression(expression, vtlBindings);
		} catch (e) {
			logging(expression, vtlBindings, e);
			return expression;
		}
	}
	return '';
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
	type,
	features /* VTL, MD */,
	logging = loggingDefault
) {
	if (features.includes(VTL) && type.includes(VTL)) {
		const vtl = executeVTL(expression, vtlBindings, logging);
		if (features.includes(MD) && type.includes(MD))
			return <MdLabel expression={vtl} />;
		return vtl;
	}
	return expression;
}

export default executeExpression;
