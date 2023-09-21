import getCompatibleVTLExpression from './get-compatible-vtl-expression';
import type { LunaticExpression, LunaticState } from '../type';

function executeConditionFilter(
	filter: LunaticExpression,
	execute: LunaticState['executeExpression'],
	iteration?: number
) {
	if (filter && typeof execute === 'function') {
		const { value } = filter;
		return execute(getCompatibleVTLExpression(value), { iteration });
	}
	return undefined;
}

export default executeConditionFilter;
