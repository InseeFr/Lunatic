import type { LunaticError } from '../type';

/**
 * Keep errors with at least one error inside
 */
function getErrorsWithoutEmptyValue(
	errors?: Record<string, LunaticError[]>
): Record<string, LunaticError[]> {
	return errors
		? Object.fromEntries(
				Object.entries(errors).filter(
					([_, value]) => Array.isArray(value) && value.length
				)
		  )
		: {};
}

export default getErrorsWithoutEmptyValue;
