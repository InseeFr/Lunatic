import { objectMap } from './object';
import { interpret } from '@inseefr/trevas';
import { CharStream } from '@making-sense/antlr4ng';
import { VtlLexer } from '@making-sense/vtl-2-1-antlr-tools-ts/lib/generated/VtlLexer';

type DataSet = { dataPoints: any[][] };

/**
 * Simplified version of interpret (that converts binding and value)
 */
export function interpretVTL<T>(
	expression: string,
	bindings: Record<string, unknown>
): T {
	console.log('interpretVTL', expression, bindings);
	const vtlBindings = objectMap(bindings, (k, v) => [
		k,
		getVTLCompatibleValue(k, v),
	]);
	console.log('vtlBindings', vtlBindings);
	const result = interpret(expression, vtlBindings);
	console.log('interpretVTL result', result);
	if (isDataSet(result)) {
		const resultExtracted = extractDataSetResult(result) as T;
		console.log('extract from dataSet', resultExtracted);
		return resultExtracted;
	}

	return result as T;
}

/**
 * Extract variables used in a VTL expression
 */
export function parseVTLVariables(expression: string): string[] {
	try {
		const chars = CharStream.fromString(expression);
		const lexer = new VtlLexer(chars);
		const dependencySet = lexer.getAllTokens().reduce(function (
			acc,
			{ start, stop, type }
		) {
			if (type === VtlLexer.IDENTIFIER) {
				acc.add(expression.substring(start, stop + 1));
			}
			return acc;
		}, new Set<string>());
		dependencySet.delete(expression); // Prevent dependency loop
		return Array.from(dependencySet);
	} catch {
		return [];
	}
}

/**
 * Transform a value to make it compatible with VTL (for bindings)
 */
export function getVTLCompatibleValue(name: string, value: unknown) {
	if (value === undefined) {
		return null;
	}
	if (Array.isArray(value)) {
		return {
			dataStructure: [
				{
					name: 'Id_1',
					type: 'STRING',
					role: 'IDENTIFIER',
				},
				{
					name: name,
					type: 'STRING',
					role: 'MEASURE',
				},
			],
			dataPoints: value.map((valueOfIteration) => [
				'scope_racine',
				valueOfIteration,
			]),
		};
	}

	return value;
}

export function getExpressionType(expression: unknown): string {
	if (typeof expression === 'string') {
		return 'TXT';
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
	if (typeof expression === 'string' || typeof expression === 'number') {
		return expression.toString();
	}
	if (
		expression &&
		typeof expression === 'object' &&
		'value' in expression &&
		(typeof expression.value === 'string' ||
			typeof expression.value === 'number')
	) {
		return expression.value.toString();
	}
	return '';
}

function isDataSet(result: unknown): result is DataSet {
	console.log('result', result);
	return (
		typeof result === 'object' &&
		result !== null &&
		'dataPoints' in result &&
		result.dataPoints !== null &&
		typeof result.dataPoints === 'object' &&
		Array.isArray(result.dataPoints)
	);
}

function extractDataSetResult(dataSet: DataSet) {
	const { dataPoints } = dataSet;
	if (
		dataPoints &&
		Array.isArray(dataPoints) &&
		dataPoints.length > 0 &&
		Array.isArray(dataPoints[0]) &&
		dataPoints[0].length > 0
	) {
		return dataPoints[0][0];
	}
	return undefined;
}
