import { VtlLexer } from '@inseefr/vtl-2.0-antlr-tools';
import antlr4 from 'antlr4';
import { LunaticState } from '../../type';

/**
 * Find variables used in an expression
 */
function getExpressionVariables(
	expression: string,
	variables: LunaticState['variables']
): string[] {
	try {
		const chars = new antlr4.InputStream(expression);
		console.log({ chars });
		const lexer = new VtlLexer(chars);
		return lexer.getAllTokens().reduce(function (array, { start, stop, type }) {
			if (type === 234) {
				const token = expression.substring(start, stop - start + 1);
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
