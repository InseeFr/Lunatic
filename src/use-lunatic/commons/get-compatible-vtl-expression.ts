import { VTL } from '../../utils/constants';
import { LunaticExpression } from '../type';

/**
 * Ensure that an expression is compatible with VTL (convert if necessary)
 */
function getCompatibleVTLExpression(
	expression: LunaticExpression | string
): LunaticExpression | undefined {
	if (typeof expression === 'string') {
		return { value: expression, type: VTL };
	}
	if (typeof expression === 'object') {
		const { type } = expression;
		if (type === VTL) {
			return expression;
		}
	}
	console.warn(`Non-VTL compatible expression : ${expression}`);
}

export default getCompatibleVTLExpression;
