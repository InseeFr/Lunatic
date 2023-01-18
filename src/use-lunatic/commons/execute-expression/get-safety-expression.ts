import { VTL } from '../../../utils/constants';
import { Expression } from '../../type';

/**
 * Convert an unknown variable into a valid VTL expression object
 */
function getSafetyExpression(expression: unknown): Expression {
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
		return { ...(expression as Expression), type: VTL };
	}

	// TODO: ensure we really have an expression here or throw an error
	return expression as Expression;
}

export default getSafetyExpression;
