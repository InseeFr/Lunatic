import getCompatibleVTLExpression from './get-compatible-vtl-expression';
import type { LunaticExpression, LunaticState } from '../type';
import { firstValueItem } from '../../utils/array';

function executeConditionFilter(
	filter: LunaticExpression,
	execute: LunaticState['executeExpression'],
	iteration?: number
) {
	if (filter && typeof execute === 'function') {
		const { value } = filter;
		const result = execute(getCompatibleVTLExpression(value), { iteration });
		// Todo : replace this with a casting system on execute
		return Array.isArray(result) ? firstValueItem(result) : result;
	}
	return undefined;
}

export default executeConditionFilter;
