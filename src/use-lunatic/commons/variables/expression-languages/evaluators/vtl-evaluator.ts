import {
	interpretVTL,
	getExpressionVariables,
} from '../../../../../utils/expression-language/vtl/vtl';
import {
	ExpressionEvaluationError,
	ExpressionEvaluatorLanguage,
} from './expression-language';

export class VTLEvaluator implements ExpressionEvaluatorLanguage {
	readonly type = 'VTL' as const;
	evaluate(expression: string, bindings: Record<string, unknown>): unknown {
		try {
			return interpretVTL(expression, bindings);
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
