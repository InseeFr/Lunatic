function executeConditionFilter(filter, execute, iteration) {
	if (filter && typeof execute === 'function') {
		const { value } = filter;

		function logging(...args) {
			console.warn(args);
			console.warn('executeConditionFilter:', filter);
		}
		return execute(value, { iteration, logging });
	}
	return undefined;
}

export default executeConditionFilter;
