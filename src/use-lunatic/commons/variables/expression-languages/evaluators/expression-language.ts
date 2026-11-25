import { DynamicExpressionLanguage } from '../../../../../type.source';

export interface ExpressionEvaluatorLanguage {
	readonly type: DynamicExpressionLanguage;
	evaluate(expression: string, bindings: Record<string, unknown>): unknown;
	getDependencies(expression: string): string[];
}

export class ExpressionEvaluationError extends Error {
	constructor(
		public readonly expression: string,
		public readonly type: DynamicExpressionLanguage,
		public readonly bindings: Record<string, unknown>,
		public readonly cause?: Error
	) {
		super(
			`Failed to evaluate ${type} expression: "${expression}". Cause: ${cause?.message}`
		);
		this.name = 'ExpressionEvaluationError';
	}
}
