import { LunaticError, LunaticState } from '../type';

/**
 * Keep errors with at least one error inside
 */
function getErrorsWithoutEmptyValue(
	errors: LunaticState['errors']
): LunaticState['errors'] {
	return errors
		? Object.fromEntries(
				Object.entries(errors).filter(
					([_, value]) => Array.isArray(value) && value.length
				)
		  )
		: ({} as { [id: string]: LunaticError[] });
}

export default getErrorsWithoutEmptyValue;
