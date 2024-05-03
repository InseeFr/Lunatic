import type { LunaticExpression, LunaticReducerState } from '../type';
import { firstValueItem } from '../../utils/array';

function executeConditionFilter(
	filter: LunaticExpression,
	execute: LunaticReducerState['executeExpression'],
	iteration?: number
) {
	if (filter && typeof execute === 'function') {
		const result = execute(filter, { iteration });
		// Handle some edge cases where the value is not what we expect
		return Array.isArray(result) ? firstValueItem(result) : result;
	}
	return undefined;
}

export default executeConditionFilter;
