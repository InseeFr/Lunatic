import { VtlLexer } from '@inseefr/vtl-2.0-antlr-tools';
import antlr4 from 'antlr4';

function getExpressionVariables(expression, variables) {
	try {
		const chars = new antlr4.InputStream(expression);
		const lexer = new VtlLexer(chars);
		return lexer.getAllTokens().reduce(function (array, { start, stop, type }) {
			if (type === 234) {
				const token = expression.substr(start, stop - start + 1);
				if (array.indexOf(token) === -1 && token in variables) {
					return [...array, token];
				}
			}
			return array;
		}, []);
	} catch (e) {
		return [];
	}
}

export default getExpressionVariables;
