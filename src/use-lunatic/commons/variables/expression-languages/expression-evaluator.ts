import {
	DynamicExpression,
	DynamicExpressionLanguage,
} from '../../../../type.source';
import { ExpressionEvaluatorLanguage } from './evaluators/expression-language';
import { TXTEvaluator } from './evaluators/txt-evaluator';
import { VTLEvaluator } from './evaluators/vtl-evaluator';

export class ExpressionEvaluator {
	private static instance: ExpressionEvaluator;
	private readonly evaluators: Map<
		DynamicExpressionLanguage,
		ExpressionEvaluatorLanguage
	> = new Map();

	private constructor() {
		this.register(new VTLEvaluator());
		// this.register(new CELEvaluator());
		this.register(new TXTEvaluator());
	}

	public static getInstance(): ExpressionEvaluator {
		if (!ExpressionEvaluator.instance) {
			ExpressionEvaluator.instance = new ExpressionEvaluator();
		}
		return ExpressionEvaluator.instance;
	}

	public register(evaluator: ExpressionEvaluatorLanguage): void {
		this.evaluators.set(evaluator.type, evaluator);
	}

	public evaluate(
		expression: DynamicExpression,
		bindings: Record<string, unknown>
	): unknown {
		const evaluator = this.getEvaluator(expression.type);
		return evaluator.evaluate(expression.value, bindings);
	}

	public getDependencies(expression: DynamicExpression): string[] {
		const evaluator = this.getEvaluator(expression.type);
		return evaluator.getDependencies(expression.value);
	}

	private getEvaluator(
		type: DynamicExpressionLanguage
	): ExpressionEvaluatorLanguage {
		const evaluator = this.evaluators.get(type);
		if (!evaluator) {
			throw new Error(`No evaluator registered for expression type: "${type}"`);
		}
		return evaluator;
	}
}

export const expressionEvaluator = ExpressionEvaluator.getInstance();
