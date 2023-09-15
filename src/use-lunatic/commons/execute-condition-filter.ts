import getCompatibleVTLExpression from './get-compatible-vtl-expression';
import type { LunaticExpression, LunaticState } from '../type';
import { type ExpressionLogger } from './execute-expression/create-execute-expression';

function executeConditionFilter(
	filter: LunaticExpression,
	execute: LunaticState['executeExpression'],
	iteration?: number
) {
	if (filter && typeof execute === 'function') {
		const { value } = filter;

		const logging: ExpressionLogger = (...args) => {
			console.warn(args);
			console.warn('executeConditionFilter:', filter);
		};
		return execute(getCompatibleVTLExpression(value), { iteration, logging });
	}
	return undefined;
}

export default executeConditionFilter;
