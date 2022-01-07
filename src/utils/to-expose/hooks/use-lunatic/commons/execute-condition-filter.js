function executeConditionFilter(filter, execute, iteration) {
	if (filter && typeof execute === 'function') {
		const { value, bindingDependencies } = filter;

		function logging(...args) {
			console.warn(args);
			console.warn('executeConditionFilter:', filter);
		}
		return execute(value, { bindingDependencies, iteration, logging });
	}
	return undefined;
}

export default executeConditionFilter;
