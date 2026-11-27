import {
	evaluateCEL,
	getExpressionVariables,
} from '../../../../../utils/expression-language/cel/cel';
import {
	ExpressionEvaluationError,
	ExpressionEvaluatorLanguage,
} from './expression-language';

export class CELEvaluator implements ExpressionEvaluatorLanguage {
	readonly type = 'CEL' as const;
	evaluate(expression: string, bindings: Record<string, unknown>): unknown {
		try {
			return evaluateCEL(expression, bindings);
		} catch (error) {
			throw new ExpressionEvaluationError(
				expression,
				this.type,
				bindings,
				error as Error
			);
		}
	}
	getDependencies(expression: string): string[] {
		return getExpressionVariables(expression);
	}
}
