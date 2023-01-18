import { VtlLexer } from '@inseefr/vtl-2.0-antlr-tools';
import antlr4 from 'antlr4';

/**
 * Find variables used in an expression
 */
function getExpressionVariables(
	expression: unknown,
	variables: { [variableName: string]: unknown }
): string[] {
	let expressionValue = '';
	if (typeof expression === 'string') {
		expressionValue = expression;
	} else if (
		typeof expression === 'object' &&
		expression &&
		'value' in expression &&
		typeof expression.value === 'string'
	) {
		expressionValue = expression.value;
	}
	if (expressionValue === '') {
		return [];
	}
	try {
		const chars = new antlr4.InputStream(expressionValue);
		const lexer = new VtlLexer(chars);
		return lexer.getAllTokens().reduce(function (array, { start, stop, type }) {
			if (type === 234) {
				const token = expressionValue.substring(start, stop + 1);
				if (array.indexOf(token) === -1 && token in variables) {
					return [...array, token];
				}
			}
			return array;
		}, [] as string[]);
	} catch (e) {
		return [];
	}
}

export default getExpressionVariables;
