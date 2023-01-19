import getCompatibleVTLExpression from './get-compatible-vtl-expression';
import { LunaticExpression, LunaticState } from '../type';

function executeConditionFilter(
	filter: LunaticExpression,
	execute: LunaticState['executeExpression'],
	iteration?: number
) {
	if (filter && typeof execute === 'function') {
		const { value } = filter;

		function logging(...args: string[]) {
			console.warn(args);
			console.warn('executeConditionFilter:', filter);
		}
		return execute(getCompatibleVTLExpression(value), { iteration, logging });
	}
	return undefined;
}

export default executeConditionFilter;
