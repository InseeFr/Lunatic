function executeConditionFilter(filter, execute, iteration) {
	if (filter && typeof execute === 'function') {
		const { value, bindingDependencies } = filter;
		return execute(value, { bindingDependencies, iteration });
	}
	return undefined;
}

export default executeConditionFilter;
