function getErrorsWithoutEmptyValue(errors) {
	return errors
		? Object.fromEntries(
				Object.entries(errors).filter(
					([key, value]) => Array.isArray(value) && value.length
				)
		  )
		: {};
}

export default getErrorsWithoutEmptyValue;
