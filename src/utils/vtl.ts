import { objectMap } from './object';
import { interpret } from '@inseefr/trevas';
import antlr4 from 'antlr4';
import { VtlLexer } from '@inseefr/vtl-2.0-antlr-tools';

type DataSet = { dataPoints: { result: unknown } };

/**
 * Simplified version of interpret (that converts binding and value)
 */
export function interpretVTL<T>(
	expression: string,
	bindings: Record<string, unknown>
): T {
	const result = interpret(
		expression,
		objectMap(bindings, (k, v) => [k, getVTLCompatibleValue(v)])
	);
	if (isDataSet(result)) {
		return extractDataSetResult(result) as T;
	}
	return result as T;
}

/**
 * Extract variables used in a VTL expression
 */
export function parseVTLVariables(expression: string): string[] {
	try {
		const chars = new antlr4.InputStream(expression);
		const lexer = new VtlLexer(chars);
		const dependencySet = lexer
			.getAllTokens()
			.reduce(function (acc, { start, stop, type }) {
				if (type === 234) {
					acc.add(expression.substring(start, stop + 1));
				}
				return acc;
			}, new Set<string>());
		dependencySet.delete(expression); // Prevent dependency loop
		return Array.from(dependencySet);
	} catch (e) {
		return [];
	}
}

/**
 * Transform a value to make it compatible with VTL (for bindings)
 */
export function getVTLCompatibleValue(value: unknown) {
	if (value === undefined) {
		return null;
	}
	if (Array.isArray(value)) {
		return {
			dataStructure: { result: {} },
			dataPoints: {
				result: value,
			},
		};
	}

	return value;
}

export function getExpressionType(expression: unknown): string {
	if (typeof expression === 'string') {
		return 'VTL';
	}
	if (
		expression &&
		typeof expression === 'object' &&
		'type' in expression &&
		typeof expression.type === 'string'
	) {
		return expression.type;
	}
	return '';
}

export function getExpressionAsString(expression: unknown): string {
	if (typeof expression === 'string') {
		return expression;
	}
	if (
		expression &&
		typeof expression === 'object' &&
		'value' in expression &&
		typeof expression.value === 'string'
	) {
		return expression.value;
	}
	return '';
}

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
