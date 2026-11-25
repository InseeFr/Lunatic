/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExpressionEvaluatorLanguage } from './expression-language';

export class TXTEvaluator implements ExpressionEvaluatorLanguage {
	readonly type = 'TXT' as const;
	evaluate(expression: string, _bindings: Record<string, unknown>): unknown {
		return expression;
	}
	getDependencies(_expression: string): string[] {
		return [];
	}
}
