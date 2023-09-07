import { type ReactNode } from 'react';
import { interpret } from '@inseefr/trevas';
import MdLabel from '../../../components/commons/components/md-label';
import getVtlCompatibleValue from '../../../utils/vtl';
import { MD, VTL } from '../../../utils/constants';
import type { VTLBindings } from '../../type';

type DataSet = { dataPoints: { result: unknown } };

function isDataSet(result: unknown): result is DataSet {
	return (
		typeof result === 'object' &&
		result !== null &&
		'dataPoints' in result &&
		result.dataPoints !== null &&
		typeof result.dataPoints === 'object' &&
		'result' in result.dataPoints
	);
}

function extractDataSetResult(dataSet: DataSet) {
	const { dataPoints } = dataSet;
	if (dataPoints) {
		const { result } = dataPoints;
		return result;
	}
	return undefined;
}

/**
 * Run a VTL expression and return the result
 */
export function executeVtlExpression<T = unknown>(
	expression: string,
	vtlBindings: { [variableName: string]: unknown }
) {
	// Make sur all values can be handled by VTL
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

function executeVTL(
	expression: string,
	vtlBindings: VTLBindings,
	logging: typeof loggingDefault
) {
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

function loggingDefault(expression: string, bindings: VTLBindings, e: unknown) {
	if (process.env.NODE_ENV === 'development') {
		console.warn(`VTL error :  ${expression}`, bindings);
		console.warn(e);
	}
}

function executeExpression(
	vtlBindings: VTLBindings,
	expression: string,
	type: 'VTL' | 'VTL|MD',
	features: string[],
	logging = loggingDefault
): ReactNode {
	if (features.includes(VTL) && type.includes(VTL)) {
		const vtl = executeVTL(expression, vtlBindings, logging) as ReactNode;
		if (features.includes(MD) && type.includes(MD) && typeof vtl === 'string')
			return <MdLabel expression={vtl} />;
		return vtl;
	}
	return expression;
}

export default executeExpression;
