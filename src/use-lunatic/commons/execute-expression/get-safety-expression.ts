import { VTL } from '../../../utils/constants';
import type { LunaticExpression } from '../../type';

/**
 * Convert an unknown variable into a valid VTL expression object
 */
function getSafetyExpression(expression: unknown): LunaticExpression {
	if (typeof expression === 'string') {
		return { value: expression, type: VTL };
	}
	// TODO: fix into model and supress this block
	if (
		expression &&
		typeof expression === 'object' &&
		'value' in expression &&
		!('type' in expression)
	) {
		return { ...(expression as LunaticExpression), type: VTL };
	}

	// TODO: ensure we really have an expression here or throw an error
	return expression as LunaticExpression;
}

export default getSafetyExpression;
